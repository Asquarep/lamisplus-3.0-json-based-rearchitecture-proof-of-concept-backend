package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import lombok.RequiredArgsConstructor;
import org.peterabiodun.proofofconceptconfigurablemodules.model.RoleDto;
import org.peterabiodun.proofofconceptconfigurablemodules.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    @PreAuthorize("hasPermission(#id, 'ROLE', 'READ_ROLES')")
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @PostMapping
    @PreAuthorize("hasPermission(#id, 'ROLE', 'CREATE_ROLES')")
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        return ResponseEntity.ok(roleService.createRole(roleDto));
    }

    @PutMapping("/{id}/permissions")
    @PreAuthorize("hasPermission(#id, 'ROLE', 'MANAGE_PERMISSIONS')")
    public ResponseEntity<RoleDto> updateRolePermissions(@PathVariable UUID id, @RequestBody Set<String> permissions) {
        return ResponseEntity.ok(roleService.updateRolePermissions(id, permissions));
    }
}
