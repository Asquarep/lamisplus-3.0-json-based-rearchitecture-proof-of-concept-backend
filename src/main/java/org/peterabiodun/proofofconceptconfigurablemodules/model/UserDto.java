package org.peterabiodun.proofofconceptconfigurablemodules.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Builder
public class UserDto {
        private Long id;
        @Size(max = 100, message = "String field cannot exceed 100 characters")
        private String name;

        @Email
        @NotBlank
        private String email;

        Set<RoleDto> roles;
        private boolean isSuperUser;
        private boolean active;
        private boolean archived;

        public static UserDto fromUser(User user) {
                boolean isSuperUser = user.getRoles().stream()
                                .flatMap(role -> role.getPermissions().stream())
                                .anyMatch(p -> "ALL_PERMISSION".equals(p.getName()));

                return new UserDtoBuilder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .name(user.getName())
                                .isSuperUser(isSuperUser)
                                .active(user.isActive())
                                .archived(user.isArchived())
                                .roles(
                                                user.getRoles().stream()
                                                                .map(RoleDto::fromEntity)
                                                                .collect(Collectors.toSet()))
                                .build();
        }
}
