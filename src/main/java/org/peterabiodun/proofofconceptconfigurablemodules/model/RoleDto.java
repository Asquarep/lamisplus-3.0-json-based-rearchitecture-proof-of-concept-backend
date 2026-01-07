package com.peterabiodun.eventsmanagementmusala.dto;

import com.peterabiodun.eventsmanagementmusala.entity.Role;
import lombok.Builder;
import lombok.Data;

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
