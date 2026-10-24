package co.za.backend.repository;

import co.za.backend.model.Cart;
import co.za.backend.model.CartItem;
import co.za.backend.model.ProductSnapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, ProductSnapshot productSnapshot);
    List<CartItem> findByCart( Cart cart);
}
