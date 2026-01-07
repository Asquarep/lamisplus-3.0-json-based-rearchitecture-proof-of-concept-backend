package com.peterabiodun.eventsmanagementmusala.service.impl;

import com.peterabiodun.eventsmanagementmusala.entity.BlackListedToken;
import com.peterabiodun.eventsmanagementmusala.repository.BlackListedTokenRepository;
import com.peterabiodun.eventsmanagementmusala.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlackListServiceImpl implements BlackListService {

    private final BlackListedTokenRepository blackListedTokenRepository;

    @Override
    public BlackListedToken blackListToken(String token) {

        BlackListedToken blackListedToken = new BlackListedToken();
        blackListedToken.setToken(token.substring(7));

        return blackListedTokenRepository.save(blackListedToken);
    }

    @Override
    public boolean tokenExist(String token){
        return blackListedTokenRepository.existsByToken(token);
    }
}

