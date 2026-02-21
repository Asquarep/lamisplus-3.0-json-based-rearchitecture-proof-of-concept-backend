package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.FieldConfigDto;

@Data@Entity
@Table(name = "fields")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FieldConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long key;
    private String display;
    private String name;
    private String type;
    @Column(name = "is_unique")
    private boolean unique = false;
    @Column(name = "is_required")
    private boolean required = false;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private FormConfig form;

    public static FieldConfig fromDto(FieldConfigDto dto) {
        return FieldConfig.builder()
                .id(dto.getId())
                .display(dto.getDisplay())
                .name(dto.getName())
                .type(dto.getType())
                .required(dto.isRequired())
                .unique(dto.isUnique())
                .form(null)
                .build();
    }
}