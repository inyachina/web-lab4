package weblab4.cool.weblab4.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.User;
import weblab4.cool.weblab4.repository.UserRepository;
import weblab4.cool.weblab4.security.jwt.JwtUser;
import weblab4.cool.weblab4.security.jwt.JwtUserFactory;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    private JwtUserFactory jwtUserFactory;
    @Autowired
    public JwtUserDetailsService( UserRepository userRepository, JwtUserFactory jwtUserFactory) {
        this.jwtUserFactory = jwtUserFactory;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;
        try {
              user = userRepository.findUserByUsername(username);
        } catch (UserNotFoundException e) {
            throw new UsernameNotFoundException("User: " + username +" not found(");
        }
        if (user == null) throw new UsernameNotFoundException("User: " + username +" not found(");
        JwtUser jwtUser = jwtUserFactory.create(user);
        return jwtUser;
    }
}
