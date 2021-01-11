package weblab4.cool.weblab4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username) throws UserNotFoundException;
//    User findUserById(Long id) throws UserNotFoundException;
//    User findUserByRefreshToken(String refreshToken) throws UserNotFoundException;
}
