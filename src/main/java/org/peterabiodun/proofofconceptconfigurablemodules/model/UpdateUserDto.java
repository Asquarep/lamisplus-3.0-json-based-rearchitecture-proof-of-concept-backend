package org.peterabiodun.proofofconceptconfigurablemodules.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class UpdateUserDto {
    @NotBlank
    @Size(max = 100, message = "String field cannot exceed 100 characters")
    private String name;

    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Please provide a valid email address")
    @NotBlank
    private String email;

    private Set<UUID> roleIds;
}
