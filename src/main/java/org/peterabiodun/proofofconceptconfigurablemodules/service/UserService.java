package org.peterabiodun.proofofconceptconfigurablemodules.service;


import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;

//@Service
public interface UserService {

    UserDto createUser(CreateUserdto userDto);
}
