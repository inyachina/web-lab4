package weblab4.cool.weblab4.dto;

import lombok.Data;

@Data
public class PointDto {
    private Double x;
    private Double y;
    private Double r;

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }
}
