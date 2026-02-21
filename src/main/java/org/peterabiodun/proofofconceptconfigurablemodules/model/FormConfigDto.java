package org.peterabiodun.proofofconceptconfigurablemodules.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FormConfig;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FormConfigDto {

    private Long id;
    private String key;
    private String version;
    private String display;
    private String tableName;
    private Long moduleId;
    private List<FieldConfigDto> fields;

    public static FormConfigDto fromEntity(FormConfig entity) {
        return FormConfigDto.builder()
                .id(entity.getId())
                .key(entity.getKey())
//                .version(entity.getModuleVersion())
                .display(entity.getDisplay())
                .tableName(entity.getTableName())
                .moduleId(entity.getId())
                .fields(entity.getFields().stream().map(FieldConfigDto::fromEntity).collect(Collectors.toList()))
                .build();
    }

}
