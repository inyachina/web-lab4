package weblab4.cool.weblab4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import weblab4.cool.weblab4.exceptions.UserNotFoundException;
import weblab4.cool.weblab4.model.Point;
import weblab4.cool.weblab4.model.User;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findAllByUser(User user);
}
