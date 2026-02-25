package org.peterabiodun.proofofconceptconfigurablemodules.service;

import org.peterabiodun.proofofconceptconfigurablemodules.model.CreateUserdto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UpdateUserDto;
import org.peterabiodun.proofofconceptconfigurablemodules.model.UserDto;

import java.util.List;
import java.util.UUID;

//@Service
public interface UserService {

    UserDto createUser(CreateUserdto userDto);

    UserDto updateUser(UUID id, UpdateUserDto updateDto);

    void deleteUser(UUID id);

    List<UserDto> getAllUsers();

    UserDto activateUser(UUID id);

    UserDto deactivateUser(UUID id);

    UserDto archiveUser(UUID id);

    UserDto unarchiveUser(UUID id);
}
