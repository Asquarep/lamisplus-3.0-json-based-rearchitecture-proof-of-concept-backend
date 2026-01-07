package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;

import java.util.Set;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User extends BaseEntity {

    @Pattern(regexp = "^[a-zA-Z0-9]+$",
            message = "Name must contain only alphanumeric characters")
    @Size(max = 100, message = "Name field cannot exceed 100 characters")
    private String name;

    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message = "Please provide a valid email address")
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be a minimum of 8 characters")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;

    public static User fromUserDto(UserDto userDto){
        return User.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .roles(
                        userDto.getRoles().stream()
                                .map(Role::fromRoleDto)
                                .collect(Collectors.toSet())
                )
                .build();
    }

    public static User fromCreateUserDto(CreateUserdto userDto){
        return User.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .password(userDto.getPassword())
                .build();
    }
}
