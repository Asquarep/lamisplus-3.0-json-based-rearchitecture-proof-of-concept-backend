package org.peterabiodun.proofofconceptconfigurablemodules.service.impl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.peterabiodun.proofofconceptconfigurablemodules.config.security.JwtTokenProvider;
import org.peterabiodun.proofofconceptconfigurablemodules.exception.ResourceNotFoundException;
import org.peterabiodun.proofofconceptconfigurablemodules.model.LoginDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.User;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.UserRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final HttpServletResponse httpServletResponse;
    private final UserRepository userRepository;
    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication ;
        String token;

        try{
            Authentication auth =  new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(),loginDto.getPassword());

            authentication = authenticationManager.authenticate(auth);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            token = jwtTokenProvider.generateToken(authentication);
            httpServletResponse.setHeader("Authorization", "Bearer " + token);
            log.info("Login Successful ${}", token);
            return token;
        }
        catch (BadCredentialsException ex){
            throw new BadCredentialsException("Incorrect user credentials");

        }

    }

    @Override
    public UserDto fetchMe(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return UserDto.fromUser(user);
    }
}
