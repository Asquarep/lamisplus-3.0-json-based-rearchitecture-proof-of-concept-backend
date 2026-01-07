package com.peterabiodun.eventsmanagementmusala.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.util.UUID;

@MappedSuperclass
@Data
//@Builder
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {
    @Id
    @GeneratedValue(generator = "pg-uuid")
    @GenericGenerator(
            name = "pg-uuid",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(unique = true)
    private UUID id;
    @CreatedDate
    private LocalDate createdDate;

    @PrePersist
    public void prePersist() {
        // Set the createdDate to the current date before persisting
        this.createdDate = LocalDate.now();
    }


}
