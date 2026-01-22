package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ModuleVersion {
    @Id
    @GeneratedValue
    private Long id;

    private String version; // 1.0.0, 1.1.0
    private boolean active;

    @ManyToOne
    private ModuleConfig module;
}

