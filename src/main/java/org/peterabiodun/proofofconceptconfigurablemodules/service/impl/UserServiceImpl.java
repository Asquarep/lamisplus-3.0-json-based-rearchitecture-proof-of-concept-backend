package org.peterabiodun.proofofconceptconfigurablemodules.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.BadRequestException;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.ResourceNotFoundException;
import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UpdateUserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.RoleRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.UserRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User.fromCreateUserDto;

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
        log.info("Saving User {}", userDto);
        validateUser(userDto);

        User user = fromCreateUserDto(userDto);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        if (userDto.getRoleIds() != null && !userDto.getRoleIds().isEmpty()) {
            roles.addAll(roleRepository.findAllById(userDto.getRoleIds()));
        } else {
            Role userRole = roleRepository.findByName(ROLE_USER).orElseThrow(
                    () -> new ResourceNotFoundException("Error: Role is not found."));
            roles.add(userRole);
        }
        user.setRoles(roles);

        try {
            User savedUser = userRepository.save(user);
            return UserDto.fromUser(savedUser);
        } catch (Exception e) {
            log.error("Error saving user", e);
            throw new BadRequestException("Error Saving user");
        }
    }

    @Override
    public UserDto updateUser(UUID id, UpdateUserDto updateDto) {
        log.info("Updating User ID: {}", id);
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + id));

        user.setName(updateDto.getName());
        if (!user.getEmail().equals(updateDto.getEmail())) {
            if (userRepository.findByEmail(updateDto.getEmail()).isPresent()) {
                throw new BadRequestException("Email is already in use!");
            }
            user.setEmail(updateDto.getEmail());
        }

        if (updateDto.getRoleIds() != null) {
            user.setRoles(new HashSet<>(roleRepository.findAllById(updateDto.getRoleIds())));
        }

        return UserDto.fromUser(userRepository.save(user));
    }

    @Override
    public void deleteUser(UUID id) {
        log.info("Deleting User ID: {}", id);
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromUser)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto activateUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + id));
        user.setActive(true);
        return UserDto.fromUser(userRepository.save(user));
    }

    @Override
    public UserDto deactivateUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + id));
        user.setActive(false);
        return UserDto.fromUser(userRepository.save(user));
    }

    @Override
    public UserDto archiveUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + id));
        user.setArchived(true);
        return UserDto.fromUser(userRepository.save(user));
    }

    @Override
    public UserDto unarchiveUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User not found with id: " + id));
        user.setArchived(false);
        return UserDto.fromUser(userRepository.save(user));
    }

    private void validateUser(CreateUserdto userDto) {
        log.info("Validating User: {}", userDto);
        Optional<User> foundUser = userRepository.findByEmail(userDto.getEmail());
        if (foundUser.isPresent()) {
            throw new BadRequestException("Email is already in use!");
        }
    }
}
