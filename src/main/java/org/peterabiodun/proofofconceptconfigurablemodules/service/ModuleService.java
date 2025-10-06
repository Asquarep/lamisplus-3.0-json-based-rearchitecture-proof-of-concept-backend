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
import org.peterabiodun.proofofconceptconfigurablemodules.model.FieldConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.util.List;
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

    public ModuleConfigDto loadModule(File moduleFile) {
        try {
            // Parse the module JSON
            ModuleConfigDto module = objectMapper.readValue(moduleFile, ModuleConfigDto.class);

            // Generate Liquibase XML changelog for this module
            generateLiquibaseChangeLog(module);

            // Normally, you’d call Liquibase API here to apply the changelog

            ModuleConfig moduleConfig = ModuleConfig.fromDto(module);
            moduleRepository.save(moduleConfig);
            return module;

        } catch (Exception e) {
            throw new RuntimeException("Failed to load module from file: " + moduleFile.getName(), e);
        }
    }

    public List<ModuleConfigDto> getAllModules() {
        return moduleRepository.findAll().stream().map(ModuleConfigDto::fromEntity).collect(Collectors.toList());
    }

    private void generateLiquibaseChangeLog(ModuleConfigDto module) throws Exception {
        String fileName = "changelog-" + module.getName().toLowerCase() + "-" + UUID.randomUUID() + ".xml";
        File changeLogFolderPath = new File("src/main/resources/db/changelog/");
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

                // Create table only if not exists
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
                    writer.write("  <changeSet id=\"add-" + tableName + "-" + columnName + "\" author=\"system\">\n");
                    writer.write("    <preConditions onFail=\"MARK_RAN\">\n");
                    writer.write("      <not><columnExists tableName=\"" + tableName + "\" columnName=\"" + columnName + "\"/></not>\n");
                    writer.write("    </preConditions>\n");
                    writer.write("    <addColumn tableName=\"" + tableName + "\">\n");
                    writer.write("      <column name=\"" + columnName + "\" type=\"VARCHAR(255)\"/>\n");
                    writer.write("    </addColumn>\n");
                    writer.write("  </changeSet>\n");
                }

            writer.write("</databaseChangeLog>\n");
            writer.close();
        }

            runLiquibaseChangeLog(changeLogFile);
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

}