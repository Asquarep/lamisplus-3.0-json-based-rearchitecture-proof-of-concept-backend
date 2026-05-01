package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "modules")
public class ModuleConfig extends BaseEntity {

    private String name;
    @Column(unique = true, nullable = false)
    private String key;
    private String description;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ModuleVersion> versions;

    public static ModuleConfig fromDto(ModuleConfigDto dto) {
        return ModuleConfig.builder()
                .name(dto.getName())
                .key(dto.getKey())
                .id(dto.getId())
                .description(dto.getDescription())
                .build();
    }


}
