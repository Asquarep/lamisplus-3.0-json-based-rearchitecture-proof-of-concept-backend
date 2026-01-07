package com.peterabiodun.eventsmanagementmusala.service.impl;


import com.peterabiodun.eventsmanagementmusala.dto.CreateUserdto;
import com.peterabiodun.eventsmanagementmusala.dto.UserDto;
import com.peterabiodun.eventsmanagementmusala.entity.Role;
import com.peterabiodun.eventsmanagementmusala.entity.User;
import com.peterabiodun.eventsmanagementmusala.exception.BadRequestException;
import com.peterabiodun.eventsmanagementmusala.exception.ResourceNotFoundException;
import com.peterabiodun.eventsmanagementmusala.repository.RoleRepository;
import com.peterabiodun.eventsmanagementmusala.repository.UserRepository;
import com.peterabiodun.eventsmanagementmusala.service.UserService;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.peterabiodun.eventsmanagementmusala.entity.User.fromCreateUserDto;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private static final String ROLE_USER = "USER";
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public UserDto createUser(CreateUserdto userDto) {
        log.info("Saving User ${}", userDto);
        validateUser(userDto);
        UserDto userDto1 = null;
        Role userRole = roleRepository.findByName(ROLE_USER).orElseThrow(
                () -> new ResourceNotFoundException("Error: Role is not found.")
        );

        try{
            User user = fromCreateUserDto(userDto);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRoles(Set.of(userRole));
            User savedUser = userRepository.save(user);
            userDto1 = UserDto.fromUser(savedUser);
        } catch (Exception e){
            throw new BadRequestException("Error Saving user");
        }
        return userDto1;
    }

    private void validateUser(CreateUserdto userDto) {
        log.info("Validating User: {}", userDto);
        Optional<User> foundUser = userRepository.findByEmail(userDto.getEmail());
        if (foundUser.isPresent()) {
            throw new BadRequestException("Email is already in use!");
        }
    }
}
