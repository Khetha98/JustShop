package co.za.backend.controller.orderController;

import co.za.backend.dto.request.CheckoutDto;
import co.za.backend.model.Order;
import co.za.backend.service.orderService.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 1. Checkout endpoint using JSON Request Body (CheckoutDto)
    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(
            Authentication authentication,
            @RequestBody CheckoutDto checkoutDto) {

        // authentication.getName() automatically retrieves the email from the JWT subject (sub)
        String userEmail = authentication.getName();
        Order order = orderService.createOrderFromCart(userEmail, checkoutDto);
        return ResponseEntity.ok(order);
    }

    // 2. Retrieval of orders for the logged-in user
    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Authentication authentication) {
        String userEmail = authentication.getName();
        List<Order> orders = orderService.getOrdersByUserEmail(userEmail);
        return ResponseEntity.ok(orders);
    }
}