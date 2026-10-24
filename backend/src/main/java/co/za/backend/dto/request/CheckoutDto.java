package co.za.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutDto {
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private String streetAddress;
    private String apartment; // optional suite/apartment
    private String suburb;
    private String city;
    private String province;
    private String postalCode;
}