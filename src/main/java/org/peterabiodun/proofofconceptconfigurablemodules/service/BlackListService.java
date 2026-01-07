package org.peterabiodun.proofofconceptconfigurablemodules.service;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.BlackListedToken;
import org.springframework.stereotype.Service;

@Service
public interface BlackListService {
    BlackListedToken blackListToken(String  token);
    boolean tokenExist(String token);
}
