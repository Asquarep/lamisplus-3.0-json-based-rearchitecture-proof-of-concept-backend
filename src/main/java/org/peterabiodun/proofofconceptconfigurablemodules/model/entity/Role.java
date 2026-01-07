package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.RoleDto;

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

