package org.peterabiodun.proofofconceptconfigurablemodules.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.BadRequestException;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleVersionDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.Status;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleVersion;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.ModuleVersionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ModuleVersionService {
    private final ModuleVersionRepository moduleVersionRepository;
    private final ModuleRepository moduleRepository;

    public List<ModuleVersionDto> getModuleVersions(String moduleKey){
        return moduleVersionRepository.findByModuleKey(moduleKey).stream().map(
                ModuleVersionDto::fromEntity
        ).collect(Collectors.toList());
    }

    public String activateModuleVersion(String moduleKey, String versionNumber) {

        moduleRepository.findByKey(moduleKey)
                .orElseThrow(() ->
                        new BadRequestException("No Module found by provided Key: " + moduleKey)
                );

        List<ModuleVersion> moduleVersions =
                moduleVersionRepository.findByModuleKey(moduleKey);

        if (moduleVersions.isEmpty()) {
            throw new BadRequestException("No Module versions found for key: " + moduleKey);
        }

        boolean found = false;

        for (ModuleVersion mv : moduleVersions) {
            if (mv.getVersionNumber().equals(versionNumber)) {
                mv.setStatus(Status.ACTIVE);
                found = true;
            } else {
                mv.setStatus(Status.INACTIVE);
            }
        }

        if (!found) {
            throw new BadRequestException(
                    "No Module version found by provided parameters: " + moduleKey + ", " + versionNumber
            );
        }

        moduleVersionRepository.saveAll(moduleVersions);

        return "Module Version Activated Successfully";
    }

    public String deactivateModuleVersion(String moduleKey, String versionNumber) {

        moduleRepository.findByKey(moduleKey)
                .orElseThrow(() ->
                        new BadRequestException("No Module found by provided Key: " + moduleKey)
                );

        ModuleVersion moduleVersion =
                moduleVersionRepository.findByModuleKeyAndVersionNumber(moduleKey, versionNumber).orElseThrow(
                        ()-> new BadRequestException(
                                "No Module version found by provided parameters: " + moduleKey + ", " + versionNumber
                        )
                );

        moduleVersion.setStatus(Status.INACTIVE);
        moduleVersionRepository.save(moduleVersion);

        return "Module Version Activated Successfully";
    }
}
