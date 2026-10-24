package co.za.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@ToString
@Getter
@Setter
public class ProductSnapshot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private Long odooProductId;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String imageUrl;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String image;
    private BigDecimal price;
    private BigDecimal stock;
    private String category;
    @UpdateTimestamp
    private LocalDateTime lastSyncedAt;
    private boolean isActive;

}
