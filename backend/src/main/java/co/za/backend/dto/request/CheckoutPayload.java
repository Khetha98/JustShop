package co.za.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CheckoutPayload {
    private CheckoutDto checkoutDto;
    private List<AddToBag> items;
}