package com.peterabiodun.eventsmanagementmusala.service;

import com.peterabiodun.eventsmanagementmusala.dto.CreateUserdto;
import com.peterabiodun.eventsmanagementmusala.dto.UserDto;
import org.springframework.stereotype.Service;

//@Service
public interface UserService {

    UserDto createUser(CreateUserdto userDto);
}
