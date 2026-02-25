package org.peterabiodun.proofofconceptconfigurablemodules.service;

import lombok.RequiredArgsConstructor;
import org.peterabiodun.proofofconceptconfigurablemodules.model.RoleDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Permission;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.PermissionRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(RoleDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoleDto createRole(RoleDto roleDto) {
        Role role = Role.builder()
                .name(roleDto.getName())
                .build();
        return RoleDto.fromEntity(roleRepository.save(role));
    }

    @Transactional
    public RoleDto updateRolePermissions(UUID roleId, Set<String> permissionNames) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Permission> permissions = permissionNames.stream()
                .map(name -> permissionRepository.findByName(name)
                        .orElseGet(() -> permissionRepository.save(Permission.builder().name(name).build())))
                .collect(Collectors.toSet());

        role.setPermissions(permissions);
        return RoleDto.fromEntity(roleRepository.save(role));
    }
}
