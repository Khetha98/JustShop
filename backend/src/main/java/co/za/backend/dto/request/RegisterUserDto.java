package co.za.backend.dto.request;

import co.za.backend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {
    private String fullName;
    private String email;
    private String password;
}
