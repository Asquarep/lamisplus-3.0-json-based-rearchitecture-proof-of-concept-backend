package org.peterabiodun.proofofconceptconfigurablemodules.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FormConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleVersion;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ModuleVersionDto {
    private Long id;
    private String moduleKey;
    private String codename;
    private String versionNumber;
    private String status;
    private List<FormConfigDto> forms;
    private LocalDateTime createdAt;

    public static ModuleVersionDto fromEntity(ModuleVersion entity) {
        return ModuleVersionDto.builder()
                .id(entity.getId())
                .moduleKey(entity.getModule().getKey())
                .codename(entity.getCodename())
                .versionNumber(entity.getVersionNumber())
                .status(entity.getStatus() != null ? entity.getStatus().toString() : null)
                .createdAt(entity.getCreatedAt())
                .build();
    }

}
