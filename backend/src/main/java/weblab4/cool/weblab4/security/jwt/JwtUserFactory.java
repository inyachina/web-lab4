package weblab4.cool.weblab4.security.jwt;

import org.springframework.stereotype.Component;
import weblab4.cool.weblab4.model.User;

@Component
public class JwtUserFactory implements JwtFactory<JwtUser, User> {

    @Override
    public JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword());
    }
}
