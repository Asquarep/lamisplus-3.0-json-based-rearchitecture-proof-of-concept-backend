package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.Builder;
import lombok.Data;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Permission;

import java.util.UUID;

@Data
@Builder
public class PermissionDto {
    private Long id;
    private String name;
    private String description;

    public static PermissionDto fromEntity(Permission permission) {
        return PermissionDto.builder()
                .id(permission.getId())
                .name(permission.getName())
                .description(permission.getDescription())
                .build();
    }
}
