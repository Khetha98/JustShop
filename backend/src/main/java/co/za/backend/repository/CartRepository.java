package co.za.backend.repository;

import co.za.backend.enums.CartStatus;
import co.za.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

import static co.za.backend.enums.UserStatus.ACTIVE;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByUserIdAndStatus(UUID userId, CartStatus CartStatus);
}
