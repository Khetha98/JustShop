package co.za.backend.dto.request;

import co.za.backend.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String name;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal stock;
    private String category;
    private ProductStatus status;
}