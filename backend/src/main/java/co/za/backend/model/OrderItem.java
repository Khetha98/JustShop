package co.za.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    private String productName;
    private int quantity;
    private BigDecimal price;
}
