package org.peterabiodun.proofofconceptconfigurablemodules.model;

import lombok.Builder;
import lombok.Data;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;

import java.util.UUID;

@Data
@Builder
public class RoleDto {
    private UUID id;
    private String name;

    public static RoleDto fromRole(Role role){
        return new RoleDtoBuilder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }
}
