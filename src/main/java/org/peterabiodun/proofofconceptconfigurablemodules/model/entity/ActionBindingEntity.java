package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "action_bindings")
public class ActionBindingEntity extends BaseEntity{
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

