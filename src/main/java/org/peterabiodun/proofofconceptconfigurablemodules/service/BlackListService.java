package com.peterabiodun.eventsmanagementmusala.service;

import com.peterabiodun.eventsmanagementmusala.entity.BlackListedToken;
import org.springframework.stereotype.Service;

@Service
public interface BlackListService {
    BlackListedToken blackListToken(String  token);
    boolean tokenExist(String token);
}
