package co.za.backend.dto.response;

import co.za.backend.enums.UserRole;
import lombok.*;

@Getter
@Setter
@ToString
public class LoginResponse {

    private String token;
    private long expiresIn;
    private UserRole role;
}
