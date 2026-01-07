package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FormConfig;
import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.ModuleConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<FormConfig, Long> {

    @Query(value = "SELECT * FROM forms WHERE module_id = ?1 ", nativeQuery = true)
    List<FormConfig> findByModuleId(Long moduleId);
}