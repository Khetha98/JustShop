package co.za.backend.controller.cartController;

import co.za.backend.dto.request.AddToBag;
import co.za.backend.dto.response.CartResponse;
import co.za.backend.service.cartService.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(cartService.getActiveCart(userEmail));
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            Authentication authentication,
            @RequestBody AddToBag addToBag) {
        System.out.println("At the cart item addition");
        String userEmail = authentication.getName();
        System.out.println("Email of the user sending request: "+userEmail);
        return ResponseEntity.ok(cartService.addItemToCart(userEmail, addToBag));
    }
}