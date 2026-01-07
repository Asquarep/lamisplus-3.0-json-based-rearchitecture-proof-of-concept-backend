package com.peterabiodun.eventsmanagementmusala.entity;

import com.peterabiodun.eventsmanagementmusala.dto.RoleDto;
import lombok.*;

import jakarta.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Table(name = "roles")
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity{
    @Column(length = 60)
    private String name;

    public static Role fromRoleDto(RoleDto roleDto){
        return new RoleBuilder()
                .name(roleDto.getName())
                .build();
    }
}

