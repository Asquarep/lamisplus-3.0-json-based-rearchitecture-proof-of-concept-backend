package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "action_bindings")
public class ActionBindingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String event; // e.g. "onFormSave", "onButtonClick"
    private Long moduleId;
    private Long formId;
    private Long pageId;
    private Long componentId;
    private Long actionId;
    private int orderIndex;

    @Column(columnDefinition = "jsonb")
    private String conditions;

    // getters and setters
}

