package com.peterabiodun.eventsmanagementmusala.entity;


import jakarta.persistence.Table;
import lombok.*;

import jakarta.persistence.Entity;

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
