package co.za.backend.repository;

import co.za.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    Optional<OrderItem> findByOrderAndProduct(Order order, Product product);
}
