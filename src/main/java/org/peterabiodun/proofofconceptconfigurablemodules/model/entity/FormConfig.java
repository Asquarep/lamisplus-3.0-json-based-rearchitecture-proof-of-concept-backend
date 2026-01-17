package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FormConfigDto;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "forms")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String key;
    private String display;
    private String tableName;

    @ManyToOne
    private ModuleVersion moduleVersion;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private ModuleConfig module;
    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FieldConfig> fields;
    
    public static FormConfig fromDto(FormConfigDto dto) {
        return FormConfig.builder()
                .display(dto.getDisplay())
                .tableName(dto.getTableName())
                .module(null)
                .fields(dto.getFields().stream().map(FieldConfig::fromDto).collect(Collectors.toList()))
                .id(dto.getId())
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
