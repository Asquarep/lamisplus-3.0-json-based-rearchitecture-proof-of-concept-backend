package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="blackListed_tokens")
public class BlackListedToken extends BaseEntity {
    private String token;
}
