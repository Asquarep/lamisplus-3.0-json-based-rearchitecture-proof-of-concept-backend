package org.peterabiodun.proofofconceptconfigurablemodules.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDto {
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message = "Please provide a valid email address")
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be a minimum of 8 characters")
    private String password;
}
