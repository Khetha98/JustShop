package co.za.backend.model;

import co.za.backend.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class DeliveryTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long orderId;
    private String courierName;
    private String trackingNumber;
    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;
    @UpdateTimestamp
    private LocalDateTime lastUpdated;
}
