package co.za.backend.controller.orderController;

import co.za.backend.dto.request.CheckoutPayload;
import co.za.backend.dto.response.OrderResponse;
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

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(
            Authentication authentication,
            @RequestBody CheckoutPayload payload) {

        String userEmail = authentication.getName();
        OrderResponse orderResponse = orderService.createOrder(userEmail, payload.getCheckoutDto(), payload.getItems());
        return ResponseEntity.ok(orderResponse);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders(Authentication authentication) {
        String userEmail = authentication.getName();
        List<OrderResponse> orders = orderService.getOrdersByUserEmail(userEmail);
        return ResponseEntity.ok(orders);
    }
}