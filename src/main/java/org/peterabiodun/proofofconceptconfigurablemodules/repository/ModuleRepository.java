package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleConfig, Long> {
    boolean existsByName(String name);
}