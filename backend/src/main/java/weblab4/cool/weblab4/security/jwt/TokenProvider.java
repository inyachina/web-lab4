package weblab4.cool.weblab4.security.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import weblab4.cool.weblab4.exceptions.TokenNotProvidedException;
import weblab4.cool.weblab4.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class TokenProvider implements Tokenable {

    @Value("${jwt.token.secret}")
    private String secret;
    private String secretCurrentKey;
    @Value("${jwt.token.expired}")
    private long validityInMilliseconds;
    private UserDetailsService userDetailsService;

    @Autowired
    public TokenProvider(@Qualifier("jwtUserDetailsService") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    private String initAndGetSecretKey() {
        if (secretCurrentKey == null) {
            secretCurrentKey = Base64.getEncoder().encodeToString(secret.getBytes());
            secret = secretCurrentKey;
        }
        return secret;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Override
    public String generateRefreshToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, initAndGetSecretKey())
//                .signWith(secretKeyClass)
                .compact();
        return refreshToken;
    }

    @Override
    public String generateAccessToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUsername());
        Date dateNow = new Date();
        Date expireDate = new Date(dateNow.getTime() + validityInMilliseconds);
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(dateNow)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, initAndGetSecretKey())
                .compact();
        return accessToken;
    }


    @Override
    public String resolveToken(HttpServletRequest req) throws TokenNotProvidedException {
        String token = req.getHeader("shell_token");
        if (token != null) {
            return token;
        }
        throw new TokenNotProvidedException("Token not found in headers.");
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(initAndGetSecretKey()).parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }


    @Override
    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }
}