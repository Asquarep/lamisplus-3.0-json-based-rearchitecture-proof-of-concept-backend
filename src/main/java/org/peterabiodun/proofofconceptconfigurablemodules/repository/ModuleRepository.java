package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleConfig, Long> {
    @Query("SELECT m FROM ModuleConfig m LEFT JOIN FETCH m.versions")
    List<ModuleConfig> findAllWithVersions();

    boolean existsByName(String name);
    boolean existsByKey(String key);
    Optional<ModuleConfig> findByKey(String key);
}