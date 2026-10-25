package co.za.backend.service.orderService;

import co.za.backend.dto.request.CheckoutDto;
import co.za.backend.dto.request.AddToBag;
import co.za.backend.dto.response.OrderResponse;
import co.za.backend.enums.OrderStatus;
import co.za.backend.enums.PaymentStatus;
import co.za.backend.model.Order;
import co.za.backend.model.Product;
import co.za.backend.model.User;
import co.za.backend.repository.OrderRepository;
import co.za.backend.repository.ProductRepository;
import co.za.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
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

        for (AddToBag item : bagItems) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

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
}