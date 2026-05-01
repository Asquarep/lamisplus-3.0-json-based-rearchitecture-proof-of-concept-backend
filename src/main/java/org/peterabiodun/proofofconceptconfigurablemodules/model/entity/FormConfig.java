package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "forms")
public class FormConfig extends BaseEntity {
    private String key;
    private String display;
    private String tableName;

    @ManyToOne
    @JoinColumn(name = "module_version_id")
    private ModuleVersion moduleVersion;
    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FieldConfig> fields;


    public static FormConfig fromDto(FormConfigDto dto) {
        return FormConfig.builder()
                .id(dto.getId())
                .display(dto.getDisplay())
                .tableName(dto.getTableName())
                .moduleVersion(null)
                .fields(dto.getFields().stream().map(FieldConfig::fromDto).collect(Collectors.toList()))
                .build();
    }

    @PrePersist
    @PreUpdate
    private void updateChildReferences() {
        if (fields != null) {
            fields.forEach(f -> f.setForm(this));
        }
    }


}
