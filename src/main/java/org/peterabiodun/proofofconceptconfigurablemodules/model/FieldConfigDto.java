package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FieldConfig;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FieldConfigDto {
    Long id;
    private String display;
    private String name;
    private String type;
    private boolean required;
    private boolean unique;

    public static FieldConfigDto fromEntity(FieldConfig entity) {
        return FieldConfigDto.builder()
                .id(entity.getId())
                .display(entity.getDisplay())
                .name(entity.getName())
                .type(entity.getType())
                .required(entity.isRequired())
                .unique(entity.isUnique())
                .build();
    }
}
