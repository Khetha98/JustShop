package co.za.backend.service.cartService;

import co.za.backend.dto.request.AddToBag;
import co.za.backend.dto.response.CartItemDto;
import co.za.backend.dto.response.CartResponse;
import co.za.backend.enums.CartStatus;
import co.za.backend.model.Cart;
import co.za.backend.model.CartItem;
import co.za.backend.model.Product;
import co.za.backend.model.User;
import co.za.backend.repository.CartItemRepository;
import co.za.backend.repository.CartRepository;
import co.za.backend.repository.ProductRepository;
import co.za.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
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
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        Cart cart = cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus(CartStatus.ACTIVE);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(addToBag.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + addToBag.getProductId()));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(new CartItem());

        if (cartItem.getId() == null) {
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(addToBag.getQuantity());
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + addToBag.getQuantity());
        }

        try {
            cartItemRepository.save(cartItem);
            cartItemRepository.flush(); // Forces SQL execution immediately to catch errors
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        // Refresh cart from database to get updated items list
        Cart updatedCart = cartRepository.findById(cart.getId()).orElse(cart);

        return mapToResponse(updatedCart);
    }

    private CartResponse mapToResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setUserId(cart.getUser().getId());
        response.setStatus(cart.getStatus());
        response.setCreatedAt(cart.getCreatedAt());

        if (cart.getItems() != null) {
            response.setItems(cart.getItems().stream().map(item -> {
                CartItemDto dto = new CartItemDto();
                dto.setProductId(item.getProduct().getId());
                dto.setProductName(item.getProduct().getName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getProduct().getPrice());
                return dto;
            }).collect(Collectors.toList()));
        }

        return response;
    }
}