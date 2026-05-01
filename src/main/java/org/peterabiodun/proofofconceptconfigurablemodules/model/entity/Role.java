package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.peterabiodun.proofofconceptconfigurablemodules.model.RoleDto;

import java.util.Set;

@Data
@SuperBuilder
@Entity
@RequiredArgsConstructor
@Table(name = "roles")
public class Role extends BaseEntity {
    @Column(length = 60)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id"))
    private Set<Permission> permissions;

    public static Role fromDto(RoleDto roleDto) {
        return Role.builder()
                .name(roleDto.getName())
                .build();
    }
}
