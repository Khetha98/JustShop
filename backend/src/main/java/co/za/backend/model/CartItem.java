package co.za.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_snapshot_id")
    private ProductSnapshot product;
    private int quantity;
    private String priceAtTime;
}
