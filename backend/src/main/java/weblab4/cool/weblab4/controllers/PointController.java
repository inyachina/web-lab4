package weblab4.cool.weblab4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import weblab4.cool.weblab4.dto.PointDto;
import weblab4.cool.weblab4.model.Point;
import weblab4.cool.weblab4.model.User;
import weblab4.cool.weblab4.service.impl.PointServiceImpl;
import weblab4.cool.weblab4.service.impl.UserServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main/app/**")
public class PointController {
    private final PointServiceImpl pointService;
    private final UserServiceImpl userService;

    @Autowired
    PointController(PointServiceImpl pointService, UserServiceImpl userService) {
        this.userService = userService;
        this.pointService = pointService;

    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestBody PointDto pointDto) {
        Map<Object, Object> response = new HashMap<>();
        Point point = new Point(pointDto.getX(), pointDto.getY(), pointDto.getR());
        if (pointService.isValid(point)) {
            User user = userService.getCurrent();
            point.setUsername(user.getUsername());
            pointService.hit(point);
            pointService.save(point);
            return ResponseEntity.status(HttpStatus.CREATED).body(point);
        } else
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response);
    }

    @PostMapping("/clear")
    public ResponseEntity clear() {
        User user = userService.getCurrent();
        pointService.clearByUser(user);
        return ResponseEntity.ok("");
    }

    @PostMapping("/dots/all")
    public ResponseEntity getEveryUserDot() {
        User user = userService.getCurrent();
        List<Point> dotList = pointService.getAllByUser(user);
        return ResponseEntity.ok(dotList);
    }
}
