package co.za.backend.controller.productController;

import co.za.backend.model.ProductSnapshot;
import co.za.backend.service.productService.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductSnapshot>> getProducts() {
        return ResponseEntity.ok(productService.getActiveProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductSnapshot> getProduct(@PathVariable UUID id) {
        ProductSnapshot product = productService.getProductById(id);
        if (product != null) {
            System.out.println(product);
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}