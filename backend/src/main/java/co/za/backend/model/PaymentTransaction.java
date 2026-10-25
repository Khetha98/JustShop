package co.za.backend.model;

import co.za.backend.enums.PaymentStatus;
import co.za.backend.enums.TransactionProvider;
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
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long orderId;
    @Enumerated(EnumType.STRING)
    private TransactionProvider provider;
    private String providerReference;
    private BigDecimal amount;
    @Column(length = 3)
    private String currency;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
