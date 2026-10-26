package co.za.backend.service.orderService;

import co.za.backend.dto.request.CheckoutDto;
import co.za.backend.dto.request.AddToBag;
import co.za.backend.dto.response.OrderResponse;
import co.za.backend.enums.CartStatus;
import co.za.backend.enums.OrderStatus;
import co.za.backend.enums.PaymentStatus;
import co.za.backend.model.*;
import co.za.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    private JavaMailSender mailSender;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                        UserRepository userRepository, ProductRepository productRepository,
                        CartRepository cartRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public OrderResponse createOrder(String userEmail, CheckoutDto checkoutDto, List<AddToBag> bagItems) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (bagItems == null || bagItems.isEmpty()) {
            throw new RuntimeException("Bag is empty");
        }

        Order order = new Order();
        order.setUserId(user.getId());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);

        // Format delivery address string from DTO components
        String formattedAddress = String.format("%s, %s, %s, %s, %s, %s",
                checkoutDto.getStreetAddress(),
                checkoutDto.getApartment() != null ? checkoutDto.getApartment() : "",
                checkoutDto.getSuburb(),
                checkoutDto.getCity(),
                checkoutDto.getProvince(),
                checkoutDto.getPostalCode()
        );
        order.setDeliveryAddress(formattedAddress);

        BigDecimal totalAmount = BigDecimal.ZERO;
        Order savedOrder = orderRepository.save(order);

        for (AddToBag item : bagItems) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPriceAtTimeOfPurchase(product.getPrice());
            orderItemRepository.save(orderItem);

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        savedOrder.setTotalAmount(totalAmount);
        orderRepository.save(savedOrder);

        // Safely complete or clear the user's active cart without triggering cascade item deletions
        cartRepository.findByUserIdAndStatus(user.getId(), CartStatus.ACTIVE).ifPresent(cart -> {
            cart.setStatus(CartStatus.COMPLETED);
            cartRepository.save(cart);
        });

        // Send confirmation email
        sendOrderConfirmationEmail(user);

        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUserId(user.getId()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse res = new OrderResponse();
        res.setId(order.getId());
        res.setUserId(order.getUserId());
        res.setTotalAmount(order.getTotalAmount());
        res.setPaymentStatus(order.getPaymentStatus());
        res.setOrderStatus(order.getOrderStatus());
        res.setDeliveryAddress(order.getDeliveryAddress());
        res.setCreatedAt(order.getCreatedAt());
        return res;
    }

    private void sendOrderConfirmationEmail(User user) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("Khethukuthulasimamane@gmail.com");
        mail.setTo(user.getEmail());
        mail.setSubject("Order Placed Successfully!");
        mail.setText("Congratulations! Your order with JustShop was placed successfully.");
        mailSender.send(mail);
    }
}