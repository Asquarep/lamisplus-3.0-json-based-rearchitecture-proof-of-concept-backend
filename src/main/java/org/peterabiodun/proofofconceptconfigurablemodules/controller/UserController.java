package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import jakarta.validation.Valid;
import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UpdateUserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserdto createUserDto) {
        return ResponseEntity.ok(userService.createUser(createUserDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @Valid @RequestBody UpdateUserDto updateUserDto) {
        return ResponseEntity.ok(userService.updateUser(id, updateUserDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<UserDto> activateUser(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.activateUser(id));
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserDto> deactivateUser(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.deactivateUser(id));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<UserDto> archiveUser(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.archiveUser(id));
    }

    @PatchMapping("/{id}/unarchive")
    public ResponseEntity<UserDto> unarchiveUser(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.unarchiveUser(id));
    }
}
