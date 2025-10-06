package org.peterabiodun.proofofconceptconfigurablemodules.repository;

import org.peterabiodun.proofofconceptconfigurablemodules.model.entity.FieldConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldRepository extends JpaRepository<FieldConfig, Long> {
    boolean existsByName(String name);
}