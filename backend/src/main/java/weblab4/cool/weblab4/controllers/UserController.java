package weblab4.cool.weblab4.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import weblab4.cool.weblab4.dto.UserDto;
import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.User;
import weblab4.cool.weblab4.security.jwt.TokenProvider;
import weblab4.cool.weblab4.service.impl.UserServiceImpl;

import javax.persistence.NonUniqueResultException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    private final TokenProvider jwtTokenProvider;
    private final UserServiceImpl userService;

    @Autowired
    public UserController( TokenProvider jwtTokenProvider, UserServiceImpl userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        System.out.println(12);
    }

    @PostMapping("/authorization")
    public ResponseEntity authorization(@RequestBody UserDto userDto) {
        System.out.println(100);
        Map<Object, Object> response = new HashMap<>();
        try {
            String username = userDto.getUsername();
            String password = userDto.getPassword();

            if (username == null || password == null) {
                throw new NonUniqueResultException("username or password should not be empty");
            }

            try {
                userService.findByUsername(username);
                throw new NonUniqueResultException("Username is already in use.");
            }catch (UserNotFoundException ex) {}

            User user = new User(username, password);


            String refreshToken = jwtTokenProvider.generateRefreshToken(user);
            user.setRefreshToken(refreshToken);

            String accessToken = jwtTokenProvider.generateAccessToken(user);

            userService.save(user);

            Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(auth);

            response.put("refreshToken", refreshToken);
            response.put("accessToken", accessToken);
            System.out.println(1);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (IncorrectResultSizeDataAccessException | NonUniqueResultException ex) {
            response.put("description", ex.getMessage());

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }

    @PostMapping("/authentication")
    public ResponseEntity authentication(@RequestBody UserDto authenticationRequestDto) {
        Map<Object, Object> response = new HashMap<>();
        try {
            String username = authenticationRequestDto.getUsername();

            User user = userService.findByUsername(username);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, authenticationRequestDto.getPassword()));

            String accessToken = jwtTokenProvider.generateAccessToken(user);

            response.put("refreshToken", user.getRefreshToken());
            response.put("accessToken", accessToken);

            return ResponseEntity.ok(response);
        }catch (UserNotFoundException | AuthenticationException ex) {
            if (ex instanceof UserNotFoundException) response.put("description", ex.getMessage());
            else response.put("description", "Wrong login or password.");

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }

}