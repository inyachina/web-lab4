package weblab4.cool.weblab4.service;

import weblab4.cool.weblab4.model.Point;
import weblab4.cool.weblab4.model.User;

import java.util.Collection;
import java.util.List;

public interface PointService {

    List<Point> getAllByUser(User user);
    void clearByUser(User user);

    boolean isValid(Point point);
    void hit(Point point);
    void save(Point point);

}
