package org.peterabiodun.proofofconceptconfigurablemodules.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.util.UUID;

@MappedSuperclass
@Data
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
