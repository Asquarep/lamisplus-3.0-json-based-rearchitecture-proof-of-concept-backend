package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FormConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormConfigDto {

    private Long id;
    private String name;
    private String tableName;
    private Long moduleId;
    private List<FieldConfigDto> fields;

    public static FormConfigDto fromEntity(FormConfig entity) {
        return FormConfigDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .tableName(entity.getTableName())
                .moduleId(entity.getId())
                .fields(entity.getFields().stream().map(FieldConfigDto::fromEntity).collect(Collectors.toList()))
                .build();
    }

}
