package com.peterabiodun.eventsmanagementmusala.service.impl;

import com.peterabiodun.eventsmanagementmusala.config.security.JwtTokenProvider;
import com.peterabiodun.eventsmanagementmusala.dto.LoginDto;
import com.peterabiodun.eventsmanagementmusala.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private HttpServletResponse httpServletResponse;
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
            httpServletResponse.setHeader("Authorization", token);
            log.info("Login Successful ${}", token);
            return token;
        }
        catch (BadCredentialsException ex){
            throw new BadCredentialsException("Incorrect user credentials");

        }

    }
}
