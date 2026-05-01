package org.peterabiodun.proofofconceptconfigurablemodules.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.FileSystemResourceAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.BadRequestException;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FieldConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.Status;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleVersion;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private DataSource dataSource;

    private final ModuleRepository  moduleRepository;
    private final ModuleVersionRepository moduleVersionRepository;

    @Transactional
    public ModuleConfigDto loadModule(File moduleFile) {
        try {
            // Parse the module JSON
            ModuleConfigDto moduleConfigDto = objectMapper.readValue(moduleFile, ModuleConfigDto.class);

            // Generate Liquibase XML changelog for this module
            generateLiquibaseChangeLog(moduleConfigDto);

            // Normally, you’d call Liquibase API here to apply the changelog

            ModuleConfig foundModule = moduleRepository.findByKey(moduleConfigDto.getKey()).orElse(null);

            if (foundModule == null){
                ModuleConfig moduleConfig = ModuleConfig.fromDto(moduleConfigDto);
                foundModule = moduleRepository.save(moduleConfig);
            }
            if (moduleVersionRepository.existsByVersionNumber(moduleConfigDto.getVersion())){
                throw new BadRequestException("Module version " + moduleConfigDto.getVersion() +
                        " already exists. Kindly upload another version");
            }

            ModuleVersion moduleVersion = ModuleVersion.fromModuleConfigDto(moduleConfigDto);
            moduleVersion.setModule(foundModule);
            moduleVersion.setStatus(Status.INACTIVE);
            moduleVersionRepository.save(moduleVersion);
            return moduleConfigDto;

        } catch (Exception e) {
            throw new RuntimeException("Failed to load module from file: " + moduleFile.getName() + " - " + e.getMessage());
        }
    }

    public List<ModuleConfigDto> getAllModules() {
        return moduleRepository.findAllWithVersions().stream()
                .map(m -> {
                    ModuleConfigDto dto = ModuleConfigDto.fromEntity(m);
                    if (m.getVersions() != null && !m.getVersions().isEmpty()) {
                        // Find the latest version by createdAt
                        ModuleVersion latest = m.getVersions().stream()
                                .max((v1, v2) -> v1.getCreatedAt().compareTo(v2.getCreatedAt()))
                                .orElse(null);
                        
                        if (latest != null) {
                            dto.setVersion(latest.getVersionNumber());
                            dto.setCodename(latest.getCodename());
                        }
                        
                        // A module is considered active if any of its versions is ACTIVE
                        boolean anyActive = m.getVersions().stream()
                                .anyMatch(v -> v.getStatus() == Status.ACTIVE);
                        dto.setActive(anyActive);
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private void generateLiquibaseChangeLog(ModuleConfigDto module) throws Exception {
        String fileName = "changelog-" + module.getName().toLowerCase() + "-" + UUID.randomUUID() + ".xml";
        File changeLogFolderPath = new File("src/main/resources/db/module-logs/");
        File changeLogFile = new File(changeLogFolderPath, fileName);

        if (!changeLogFolderPath.exists() && !changeLogFolderPath.mkdirs()) {
            throw new IOException("Failed to create changelog directory: " + changeLogFile);
        }

        try (FileWriter writer = new FileWriter(changeLogFile)) {
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.write("<databaseChangeLog " +
                    "xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\" " +
                    "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                    "xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog " +
                    "http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd\">\n");

            for (FormConfigDto form : module.getForms()) {
                String tableName = form.getTableName().toLowerCase();

                // Create table if not exists
                writer.write("  <changeSet id=\"create-" + tableName + "\" author=\"system\">\n");
                writer.write("    <preConditions onFail=\"MARK_RAN\">\n");
                writer.write("      <not><tableExists tableName=\"" + tableName + "\"/></not>\n");
                writer.write("    </preConditions>\n");
                writer.write("    <createTable tableName=\"" + tableName + "\">\n");
                writer.write("      <column name=\"id\" type=\"BIGINT\" autoIncrement=\"true\">\n");
                writer.write("        <constraints primaryKey=\"true\" />\n");
                writer.write("      </column>\n");
                writer.write("    </createTable>\n");
                writer.write("  </changeSet>\n");

                // Add missing columns
                for (FieldConfigDto field : form.getFields()) {
                    String columnName = field.getName().toLowerCase();
                    String sqlType = mapFieldTypeToSqlType(field.getType());

                    writer.write("  <changeSet id=\"add-" + tableName + "-" + columnName + "\" author=\"system\">\n");
                    writer.write("    <preConditions onFail=\"MARK_RAN\">\n");
                    writer.write("      <not><columnExists tableName=\"" + tableName + "\" columnName=\"" + columnName + "\"/></not>\n");
                    writer.write("    </preConditions>\n");
                    writer.write("    <addColumn tableName=\"" + tableName + "\">\n");
                    writer.write("      <column name=\"" + columnName + "\" type=\"" + sqlType + "\"/>\n");
                    writer.write("    </addColumn>\n");
                    writer.write("  </changeSet>\n");
                }
            }

            writer.write("</databaseChangeLog>\n");
        }

        runLiquibaseChangeLog(changeLogFile);
    }

    /**
     * Maps the configured field type to its corresponding SQL type.
     */
    private String mapFieldTypeToSqlType(String fieldType) {
        if (fieldType == null) return "VARCHAR(255)";

        switch (fieldType.toLowerCase()) {
            case "int":
                return "INT";
            case "date":
            case "datetime":
                return "DATE";
            case "boolean":
            case "bool":
                return "BOOLEAN";
            case "string":
            default:
                return "VARCHAR(255)";
        }
    }


    private void runLiquibaseChangeLog(File changeLogFile) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            Database database = DatabaseFactory.getInstance()
                    .findCorrectDatabaseImplementation(new JdbcConnection(connection));
            // Use parent directory as search path
            FileSystemResourceAccessor resourceAccessor =
                    new FileSystemResourceAccessor(changeLogFile.getParentFile());

            // Use file name (not absolute path)
            Liquibase liquibase = new Liquibase(
                    changeLogFile.getName(),
                    resourceAccessor,
                    database
            );

            liquibase.update(new Contexts(), new LabelExpression());

        }
    }

    @Transactional
    public String activateModule(Long id) {
        ModuleConfig module = moduleRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Module not found with id: " + id));
        
        if (module.getVersions() == null || module.getVersions().isEmpty()) {
            throw new BadRequestException("Module has no versions to activate");
        }

        // Find the latest version and activate it
        ModuleVersion latest = module.getVersions().stream()
                .max((v1, v2) -> v1.getCreatedAt().compareTo(v2.getCreatedAt()))
                .orElseThrow(() -> new BadRequestException("No latest version found"));

        // Deactivate others, activate latest
        module.getVersions().forEach(v -> {
            if (v.getId().equals(latest.getId())) {
                v.setStatus(Status.ACTIVE);
            } else {
                v.setStatus(Status.INACTIVE);
            }
        });

        moduleVersionRepository.saveAll(module.getVersions());
        return "Module latest version activated successfully";
    }

    @Transactional
    public String deactivateModule(Long id) {
        ModuleConfig module = moduleRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Module not found with id: " + id));

        if (module.getVersions() != null) {
            module.getVersions().forEach(v -> v.setStatus(Status.INACTIVE));
            moduleVersionRepository.saveAll(module.getVersions());
        }
        return "Module deactivated successfully";
    }

    @Transactional
    public String uninstallModule(Long id) {
        if (!moduleRepository.existsById(id)) {
            throw new BadRequestException("Module not found with id: " + id);
        }
        moduleRepository.deleteById(id);
        return "Module uninstalled successfully";
    }

}