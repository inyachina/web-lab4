package weblab4.cool.weblab4.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weblab4.cool.weblab4.model.Point;
import weblab4.cool.weblab4.model.User;
import weblab4.cool.weblab4.repository.PointRepository;
import weblab4.cool.weblab4.service.PointService;

import java.util.List;

@Service
public class PointServiceImpl implements PointService {
    private PointRepository pointRepository;

    public PointServiceImpl(@Autowired PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    @Override
    public List<Point> getAllByUser(User user) {
        return pointRepository.findAllByUser(user);
    }

    @Override
    public void clearByUser(User user) {

    }

    @Override
    public boolean isValid(Point point) {
        try {
            return (-5 <= point.getX() && point.getX() <= 3) &&
                    ((-3 <= point.getY() && point.getY() <= 3) &&
                            (0 <= point.getR() && point.getR() <= 4));
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void hit(Point point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();
        point.setResult((x >= 0 && y >= 0 && y <= r / 2 && x <= r - 2 * y) //triangle
                || (y >= 0 && x <= 0 && y <= r / 2 && x >= -r) //square
                || (x >= 0 && y <= 0 && Math.sqrt(x * x + y * y) <= r / 2));//circle
    }


    @Override
    public void save(Point point) {
        pointRepository.save(point);
    }
}
