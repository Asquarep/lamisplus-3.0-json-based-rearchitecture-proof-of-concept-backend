package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FormConfig;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormConfigDto {

    private Long id;
    private String display;
    private String tableName;
    private Long moduleId;
    private List<FieldConfigDto> fields;

    public static FormConfigDto fromEntity(FormConfig entity) {
        return FormConfigDto.builder()
                .id(entity.getId())
                .display(entity.getDisplay())
                .tableName(entity.getTableName())
                .moduleId(entity.getId())
                .fields(entity.getFields().stream().map(FieldConfigDto::fromEntity).collect(Collectors.toList()))
                .build();
    }

}
