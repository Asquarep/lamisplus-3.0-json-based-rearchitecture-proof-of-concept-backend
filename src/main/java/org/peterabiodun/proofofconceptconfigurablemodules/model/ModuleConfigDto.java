package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ModuleConfigDto {
    private Long id;
    private String name;
    private String key;
    private String description;
    private String codename;
    private String version;
    private boolean active;
    private List<FormConfigDto> forms;

    public  static ModuleConfigDto fromEntity(ModuleConfig moduleConfig) {
        return ModuleConfigDto.builder()
                .id(moduleConfig.getId())
                .name(moduleConfig.getName())
                .key(moduleConfig.getKey())
                .description(moduleConfig.getDescription())
                .build();
    }
}
