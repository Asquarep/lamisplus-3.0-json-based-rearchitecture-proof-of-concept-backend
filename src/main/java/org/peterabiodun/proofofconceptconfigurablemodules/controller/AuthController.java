package com.peterabiodun.eventsmanagementmusala.controller;

import com.peterabiodun.eventsmanagementmusala.config.api.ApiResponse;
import com.peterabiodun.eventsmanagementmusala.dto.LoginDto;
import com.peterabiodun.eventsmanagementmusala.service.AuthService;
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
    @PostMapping
    public ApiResponse<String> login (@RequestBody LoginDto loginDto) {
        return new ApiResponse<>(true, "Login Successful", authService.login(loginDto));
    }
}
