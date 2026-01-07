package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "actions")
public class ActionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;
    private String type; // AUTOMATIC or MANUAL
    private boolean active = true;

    @Column(columnDefinition = "jsonb")
    private String config; // e.g., {"targetUrl": "/nextPage"}

    // getters and setters
}