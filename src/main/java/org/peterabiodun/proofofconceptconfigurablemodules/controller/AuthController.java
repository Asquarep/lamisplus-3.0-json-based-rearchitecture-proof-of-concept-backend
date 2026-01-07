package org.peterabiodun.proofofconceptconfigurablemodules.controller;

import org.peterabiodun.proofofconceptconfigurablemodules.model.LoginDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.api.ApiResponse;
import org.peterabiodun.proofofconceptconfigurablemodules.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/login")
    public ApiResponse<String> login (@RequestBody LoginDto loginDto) {
        return new ApiResponse<>(true, "Login Successful", authService.login(loginDto));
    }
}
