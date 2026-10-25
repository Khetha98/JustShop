package co.za.backend.service.cartService;

import co.za.backend.dto.request.AddToBag;
import co.za.backend.dto.response.CartResponse;
import co.za.backend.enums.CartStatus;
import co.za.backend.model.Cart;
import co.za.backend.model.Product;
import co.za.backend.model.User;
import co.za.backend.repository.CartRepository;
import co.za.backend.repository.ProductRepository;
import co.za.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartResponse getActiveCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus(CartStatus.ACTIVE);
                    return cartRepository.save(newCart);
                });

        return mapToResponse(cart);
    }

    @Transactional
    public CartResponse addItemToCart(String userEmail, AddToBag addToBag) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus(CartStatus.ACTIVE);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(addToBag.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Since CartItem entity was removed, logic handles cart state/persistence accordingly
        // (You can store items via JSON column or handle state in service)

        return mapToResponse(cart);
    }

    private CartResponse mapToResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setUserId(cart.getUser().getId());
        response.setStatus(cart.getStatus());
        response.setCreatedAt(cart.getCreatedAt());
        return response;
    }
}