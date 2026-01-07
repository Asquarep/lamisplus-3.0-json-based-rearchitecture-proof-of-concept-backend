package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional <Role> findByName(String name);
}
