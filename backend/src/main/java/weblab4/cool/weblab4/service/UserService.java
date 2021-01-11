package weblab4.cool.weblab4.service;

import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.User;

import java.util.List;

public interface UserService {
    List<User> getAll();
    User getCurrent();
    User findByUsername(String username) throws UserNotFoundException;
//    User findById(Long id) throws UserNotFoundException;
//    User findByRefreshToken(String refreshToken) throws UserNotFoundException;
    void delete(User user);
    void save(User user);

}
