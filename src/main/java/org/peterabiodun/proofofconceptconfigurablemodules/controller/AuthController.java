package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import org.peterabiodun.proofofconceptconfigurablemodules.model.LoginDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.api.ApiResponse;
import org.peterabiodun.proofofconceptconfigurablemodules.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/login")
    public ApiResponse<String> login (@RequestBody LoginDto loginDto) {
        return new ApiResponse<>(true, "Login Successful", authService.login(loginDto));
    }
    @GetMapping("/me")
    public ApiResponse<UserDto> fetchMe(Authentication authentication) {
        return new ApiResponse<>(
                true,
                "User fetched successfully",
                authService.fetchMe(authentication)
        );
    }
}
