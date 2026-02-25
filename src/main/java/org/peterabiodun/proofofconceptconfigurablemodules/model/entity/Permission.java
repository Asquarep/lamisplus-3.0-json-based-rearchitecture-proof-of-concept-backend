package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Table(name = "permissions")
@Getter
@Setter
@ToString
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Permission extends BaseEntity {
    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 255)
    private String description;
}
