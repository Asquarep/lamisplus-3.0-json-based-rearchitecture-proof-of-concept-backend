package org.peterabiodun.proofofconceptconfigurablemodules.service;


import org.peterabiodun.proofofconceptconfigurablemodules.model.LoginDto;

//@Service
public interface AuthService {
    String login(LoginDto loginDto);
}
