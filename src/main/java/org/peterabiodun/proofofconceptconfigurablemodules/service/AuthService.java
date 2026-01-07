package com.peterabiodun.eventsmanagementmusala.service;

import com.peterabiodun.eventsmanagementmusala.dto.LoginDto;
import com.peterabiodun.eventsmanagementmusala.dto.UserDto;
import org.springframework.stereotype.Service;

//@Service
public interface AuthService {
    String login(LoginDto loginDto);
}
