package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.RoleDto;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Table(name = "roles")
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity {
    @Column(length = 60)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id"))
    private Set<Permission> permissions;

    public static Role fromDto(RoleDto roleDto) {
        return new RoleBuilder()
                .name(roleDto.getName())
                .build();
    }
}
