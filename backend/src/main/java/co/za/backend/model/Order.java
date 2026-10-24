package co.za.backend.model;

import co.za.backend.enums.OrderStatus;
import co.za.backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private UUID userId;
    private UUID odooOrderId;
    private BigDecimal totalAmount;
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    @Column(columnDefinition = "TEXT")
    private String deliveryAddress;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
