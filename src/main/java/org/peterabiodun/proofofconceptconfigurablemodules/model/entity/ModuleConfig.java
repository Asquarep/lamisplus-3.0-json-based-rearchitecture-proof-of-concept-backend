package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;

@Data
@Entity
@Table(name = "modules")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModuleConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true, nullable = false)
    private String key;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FormConfig> forms;

    public static ModuleConfig fromDto(ModuleConfigDto dto) {
        return ModuleConfig.builder()
                .name(dto.getName())
                .key(dto.getKey())
                .id(dto.getId())
                .forms(
                        dto.getForms().stream().map(FormConfig::fromDto).collect(Collectors.toList())
                )
                .build();
    }

    @PrePersist
    @PreUpdate
    private void updateChildReferences() {
        if (forms != null) {
            forms.forEach(f -> f.setModule(this));
        }
    }
}
