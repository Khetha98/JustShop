package co.za.backend.service.cartService;

import co.za.backend.enums.CartStatus;
import co.za.backend.model.Cart;
import co.za.backend.model.CartItem;
import co.za.backend.model.ProductSnapshot;
import co.za.backend.model.User;
import co.za.backend.repository.CartItemRepository;
import co.za.backend.repository.CartRepository;
import co.za.backend.repository.ProductSnapshotRepository;
import co.za.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductSnapshotRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository,
                       ProductSnapshotRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Cart getOrCreateActiveCart(UUID userId) {
        return cartRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus(CartStatus.ACTIVE);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public Cart addItemToCart(UUID userId, UUID productId, int quantity) {
        Cart cart = getOrCreateActiveCart(userId);
        ProductSnapshot product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem());

        if (item.getId() == null) {
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setPriceAtTime(product.getPrice().toString());
        } else {
            item.setQuantity(item.getQuantity() + quantity);
        }

        cartItemRepository.save(item);
        return cart;
    }
}