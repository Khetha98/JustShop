package co.za.backend.controller.cartController;

import co.za.backend.model.Cart;
import co.za.backend.service.cartService.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable UUID userId) {
        return ResponseEntity.ok(cartService.getOrCreateActiveCart(userId));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<Cart> addItem(
            @PathVariable UUID userId,
            @RequestParam UUID productId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addItemToCart(userId, productId, quantity));
    }
}