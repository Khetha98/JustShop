package co.za.backend.service.orderService;

import co.za.backend.enums.CartStatus;
import co.za.backend.enums.OrderStatus;
import co.za.backend.enums.PaymentStatus;
import co.za.backend.model.*;
import co.za.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public Order createOrderFromCart(UUID userId, String deliveryAddress) {
        Cart cart = cartRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("Active cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCart(cart);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create Order header
        Order order = new Order();
        order.setUserId(userId);
        order.setDeliveryAddress(deliveryAddress);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);

        BigDecimal totalAmount = BigDecimal.ZERO;

        // Save order first to get ID
        Order savedOrder = orderRepository.save(order);

        // Convert cart items to order items and calculate authoritative server total
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            totalAmount = totalAmount.add(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            orderItemRepository.save(orderItem);
        }

        savedOrder.setTotalAmount(totalAmount);
        orderRepository.save(savedOrder);

        // Clear user cart
        cartItemRepository.deleteAll(cartItems);

        return savedOrder;
    }
}