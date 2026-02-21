package org.peterabiodun.proofofconceptconfigurablemodules.service;


import org.peterabiodun.proofofconceptconfigurablemodules.model.LoginDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;
import org.springframework.security.core.Authentication;

//@Service
public interface AuthService {
    String login(LoginDto loginDto);
    UserDto fetchMe(Authentication authentication);
}
