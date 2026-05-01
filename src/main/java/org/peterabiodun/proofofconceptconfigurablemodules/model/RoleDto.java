package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.Builder;
import lombok.Data;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;

import java.util.UUID;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
public class RoleDto {
    private Long id;
    private String name;
    private Set<PermissionDto> permissions;

    public static RoleDto fromEntity(Role entity) {
        return new RoleDtoBuilder()
                .id(entity.getId())
                .name(entity.getName())
                .permissions(
                        entity.getPermissions() != null ? entity.getPermissions().stream()
                                .map(PermissionDto::fromEntity)
                                .collect(Collectors.toSet()) : null)
                .build();
    }
}
