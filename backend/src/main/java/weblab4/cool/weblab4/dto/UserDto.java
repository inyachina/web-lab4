package weblab4.cool.weblab4.dto;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
