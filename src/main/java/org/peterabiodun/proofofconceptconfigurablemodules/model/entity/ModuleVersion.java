package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.peterabiodun.proofofconceptconfigurablemodules.model.ModuleConfigDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.Status;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "module_versions")
public class ModuleVersion extends BaseEntity {

    private String versionNumber; // 1.0.0, 1.1.0
    private String codename; // 1.0.0, 1.1.0
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "moduleVersion", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FormConfig> forms;

    @ManyToOne
    @JoinColumn(name = "module_key", referencedColumnName = "key")
    private ModuleConfig module;

    @PrePersist
    @PreUpdate
    private void updateChildReferences() {
        if (forms != null) {
            forms.forEach(f -> f.setModuleVersion(this));
        }
    }

    public static ModuleVersion fromModuleConfigDto(ModuleConfigDto moduleConfigDto){
        return ModuleVersion.builder()
                .versionNumber(moduleConfigDto.getVersion())
                .codename(moduleConfigDto.getCodename())
                .forms(moduleConfigDto.getForms().stream().map(FormConfig::fromDto).toList())
                .build();
    }
}

