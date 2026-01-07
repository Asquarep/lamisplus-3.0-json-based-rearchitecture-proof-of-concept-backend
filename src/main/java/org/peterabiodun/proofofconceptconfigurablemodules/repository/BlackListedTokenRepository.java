package org.peterabiodun.proofofconceptconfigurablemodules.repository;


import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.BlackListedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlackListedTokenRepository extends JpaRepository<BlackListedToken, UUID> {
    boolean existsByToken(String token);
}
