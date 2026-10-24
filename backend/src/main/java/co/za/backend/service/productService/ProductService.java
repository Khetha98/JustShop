package co.za.backend.service.productService;

import co.za.backend.model.ProductSnapshot;
import co.za.backend.repository.ProductSnapshotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {


    private final ProductSnapshotRepository repository;

    public List<ProductSnapshot> getActiveProducts() {


        return repository.findByIsActiveTrue();
    }

    public ProductSnapshot getProductById(UUID id){
        return repository.findById(id).orElseThrow();
    }
}
