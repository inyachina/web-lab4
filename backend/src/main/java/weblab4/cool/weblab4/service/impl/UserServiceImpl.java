package weblab4.cool.weblab4.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.User;
import weblab4.cool.weblab4.repository.UserRepository;
import weblab4.cool.weblab4.service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) throws UserNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) throw new UserNotFoundException("User " + username + " not found");
        return user;
    }

//    @Override
//    public User findById(Long id) throws UserNotFoundException {
//        User user = userRepository.findUserById(id);
//        if (user == null) throw new UserNotFoundException("User with id:[" + id + "] not found");
//        return user;
//    }
//
//    @Override
//    public User findByRefreshToken(String refreshToken) throws UserNotFoundException {
//        User user = userRepository.findUserByRefreshToken(refreshToken);
//        if (user == null) throw new UserNotFoundException("User with refreshToken:[" + refreshToken + "] not found");
//        return user;
//    }

    @Override
    public User getCurrent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = null;
        try {
            user = userRepository.findUserByUsername(userName);
        } catch (UserNotFoundException e) {
        }
        return user;
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
