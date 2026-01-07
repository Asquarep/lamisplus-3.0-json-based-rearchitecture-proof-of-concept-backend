package com.peterabiodun.eventsmanagementmusala.repository;


import com.peterabiodun.eventsmanagementmusala.entity.BlackListedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BlackListedTokenRepository extends JpaRepository<BlackListedToken, UUID> {
    boolean existsByToken(String token);
}
