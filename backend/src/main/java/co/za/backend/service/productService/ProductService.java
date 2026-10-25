package co.za.backend.service.productService;

import co.za.backend.dto.request.ProductRequest;
import co.za.backend.dto.response.ProductResponse;
import co.za.backend.enums.ProductStatus;
import co.za.backend.model.Product;
import co.za.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getActiveProducts() {
        return productRepository.findAll().stream()
                .filter(p -> p.getStatus() == ProductStatus.AVAILABLE)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponse getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setStatus(request.getStatus() != null ? request.getStatus() : ProductStatus.AVAILABLE);

        Product savedProduct = productRepository.save(product);
        return mapToResponse(savedProduct);
    }

    private ProductResponse mapToResponse(Product product) {
        ProductResponse res = new ProductResponse();
        res.setId(product.getId());
        res.setName(product.getName());
        res.setDescription(product.getDescription());
        res.setImageUrl(product.getImageUrl());
        res.setPrice(product.getPrice());
        res.setStock(product.getStock());
        res.setCategory(product.getCategory());
        res.setStatus(product.getStatus());
        return res;
    }
}