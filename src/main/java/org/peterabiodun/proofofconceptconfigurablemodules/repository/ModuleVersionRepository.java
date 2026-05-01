package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.Status;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleVersionRepository extends JpaRepository<ModuleVersion, Long> {
    boolean existsByVersionNumber(String name);

    @Query(value = "SELECT * FROM module_versions where module_key = :moduleKey", nativeQuery = true)
    List<ModuleVersion> findByModuleKey(String moduleKey);

    @Query(value = "SELECT * FROM module_versions where module_key = :moduleKey AND version_number = :versionNumber ", nativeQuery = true)
    Optional<ModuleVersion> findByModuleKeyAndVersionNumber(String moduleKey, String versionNumber);

    Optional<ModuleVersion> findByModuleKeyAndStatus(String moduleKey, String status);
}