package org.peterabiodun.proofofconceptconfigurablemodules.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.BadRequestException;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.ResourceNotFoundException;
import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.RoleRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.UserRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

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
