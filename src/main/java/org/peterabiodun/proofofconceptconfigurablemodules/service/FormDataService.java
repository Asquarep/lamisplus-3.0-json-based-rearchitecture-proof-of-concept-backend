package org.peterabiodun.proofofconceptconfigurablemodules.service;

import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.Status;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.FormRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.GenericJdbcRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FormDataService {

    @Autowired
    private GenericJdbcRepository repo;
    @Autowired
    private FormRepository formRepository;
    @Autowired
    private ModuleVersionRepository moduleVersionRepository;

    // Save data to dynamic table
    public void saveFormData(String tableName, Map<String, Object> data) {
        repo.insert(tableName.toLowerCase(), data);
    }

    // Fetch data from dynamic table
    public List<Map<String, Object>> fetchFormData(String formName) {
        String tableName = formName.toLowerCase();
        return repo.findAll(tableName);
    }

    // Fetch forms by module Id
    public List<FormConfigDto> fetchFormsByModuleId(Long moduleId) {
        return formRepository.findByModuleId(moduleId)
                .stream().map(FormConfigDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<FormConfigDto> fetchActiveFormsByModuleKey(String moduleKey) {
        return moduleVersionRepository.findByModuleKeyAndStatus(moduleKey, Status.ACTIVE.toString())
                .map(version -> version.getForms().stream()
                        .map(FormConfigDto::fromEntity)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }
}
