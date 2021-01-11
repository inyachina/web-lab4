package weblab4.cool.weblab4.security.jwt;

import weblab4.cool.weblab4.exceptions.TokenNotProvidedException;
import weblab4.cool.weblab4.model.User;

import javax.servlet.http.HttpServletRequest;

public interface Tokenable {

        String generateRefreshToken(User user);
        String generateAccessToken(User user);

        String resolveToken(HttpServletRequest req) throws TokenNotProvidedException;
        boolean validateToken(String token);

        String getUsername(String token);
    }

