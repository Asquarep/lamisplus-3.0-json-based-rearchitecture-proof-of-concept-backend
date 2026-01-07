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
    private UUID id;
    @Size(max = 100, message = "String field cannot exceed 100 characters")
    private String name;

    @Email
    @NotBlank
    private String email;

    Set<RoleDto> roles;


    public static UserDto fromUser(User user){
        return new UserDtoBuilder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .roles(
                        user.getRoles().stream()
                                .map(RoleDto::fromRole)
                                .collect(Collectors.toSet())
                )
                .build();
    }
}
