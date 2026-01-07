package org.peterabiodun.proofofconceptconfigurablemodules.service.impl;

import lombok.RequiredArgsConstructor;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.BlackListedToken;
import org.peterabiodun.proofofconceptconfigurablemodules.repository.BlackListedTokenRepository;
import org.peterabiodun.proofofconceptconfigurablemodules.service.BlackListService;
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

