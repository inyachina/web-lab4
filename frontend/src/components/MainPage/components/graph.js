import React from "react";
import {graph_container} from './scss/graph.module.scss';
import {r_graph_container} from './scss/graph.module.scss';
import {canvas_container} from './scss/graph.module.scss';
import {main_graph_container} from './scss/graph.module.scss';
import ScriptTag from 'react-script-tag';

class Graphic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="graph_div" className={canvas_container}>
                <canvas className={main_graph_container}  width="1205" height="1200" id="graph"/>
                <canvas className={r_graph_container} width="605" height="600" id="r_graph"/>
                <canvas className={graph_container} width="1205" height="1200" id="point_graph"/>
                <canvas className={graph_container} width="1205" height="1200" id="hit_graph"/>
                {/*<ScriptTag isHydrating={true} type="text/javascript" src="res/js/canvas.js"/>*/}
            </div>
        );
    }

    draw

    componentDidMount() {
        this.width_canvas = 1200;
        this.height_canvas = 1200;

        this.canvas = document.getElementById("graph");
        this.context = this.canvas.getContext("2d");

        this.r_canvas = document.getElementById("r_graph");
        this.r_context = this.r_canvas.getContext("2d");

        this.point_canvas = document.getElementById("point_graph");
        this.point_contex = this.point_canvas.getContext("2d");

        this.hit_canvas = document.getElementById("hit_graph");
        this.hit_contex = this.hit_canvas.getContext("2d");

        // check(this.r_context, this.point_contex, this.hit_contex);
        draw(this.context, this.width_canvas, this.height_canvas)
        document.getElementById("graph_div").scrollTo(this.width_canvas / 4, this.height_canvas / 4  )
    }
}

function check(r_context, point_contex, hit_contex) {
    r_context.fillStyle = "rgb(80,179,19, 0.3)";
    r_context.fillRect(0, 0, 1200, 1200)
    point_contex.fillStyle = "rgb(77,219,186, 0.3)";
    point_contex.fillRect(0, 0, 1200, 1200)
    hit_contex.fillStyle = "rgba(1,1,1,0.3)";
    hit_contex.fillRect(0, 0, 1200, 1200)
}

function draw(context, width_canvas, height_canvas) {
    context.beginPath();
    context.font = "12px veranda"
    context.lineWidth = 2;
    context.fillStyle = "rgb(207,207,210)";
    context.strokeStyle = "rgba(222,222,231,0.7)";
    context.clearRect(0, 0, width_canvas, height_canvas);
    // прямоугольник
    context.fillRect(width_canvas / 2 - 150, height_canvas / 2 - 75, 150, 75);
    // четверть круга
    context.moveTo(width_canvas / 2, height_canvas / 2)
    context.arc(width_canvas / 2, height_canvas / 2, 75, -3 * Math.PI / 2, 0, true);
    // треугольник
    context.moveTo(width_canvas / 2, height_canvas / 2);
    context.lineTo(width_canvas / 2, height_canvas / 2 - 75);
    context.lineTo(width_canvas / 2 + 150, height_canvas / 2);
    context.lineTo(width_canvas / 2, height_canvas / 2);
    context.fill();
    context.stroke();
    context.lineWidth = 0.4;
    context.strokeStyle = "rgba(222,222,231,0.7)";
    //штрихи x
    for (let i = 75; i <= width_canvas - 75; i += 75) {
        context.moveTo(i, height_canvas);
        context.lineTo(i, 0);
    }
    //штрихи y
    for (let i = 75; i <= height_canvas - 75; i += 75) {
        context.moveTo(width_canvas, i);
        context.lineTo(0, i);
    }
    context.closePath()

    context.stroke();
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    //ось X черные штрижки
    for (let i = 75; i <= width_canvas - 75; i += 75) {
        context.moveTo(i, height_canvas / 2 + 5);
        context.lineTo(i, height_canvas / 2 - 5);
    }
    //Ось Y черные штрижки
    for (let i = 75; i <= height_canvas - 75; i += 75) {
        context.moveTo(width_canvas / 2 + 5, i);
        context.lineTo(width_canvas / 2 - 5, i);
    }
    context.stroke();
    context.fillStyle = "rgb(17,16,16)";
    context.font = "12px veranda";
    //ось у стрелка
    context.moveTo(width_canvas / 2, height_canvas);
    context.lineTo(width_canvas / 2, 0);
    context.lineTo(width_canvas / 2 + 3, 7);
    context.moveTo(width_canvas / 2, 0);
    context.lineTo(width_canvas / 2 - 3, 7);
    context.lineTo(width_canvas / 2 + 4, 7);
    context.fillText("y", width_canvas / 2 - 18, 12);

    //Ось X стрелка
    context.moveTo(0, height_canvas / 2);
    context.lineTo(width_canvas, height_canvas / 2);
    context.lineTo(width_canvas - 7, height_canvas / 2 - 3);
    context.moveTo(width_canvas, height_canvas / 2);
    context.lineTo(width_canvas - 7, height_canvas / 2 + 3);
    context.lineTo(width_canvas - 7, height_canvas / 2 - 4);
    context.fillText("x", width_canvas - 8, height_canvas / 2 + 20);
    context.stroke();
    context.closePath();

}

function relMouseCoords(event) {
    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let canvasX = 0;
    let canvasY = 0;
    let currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x: canvasX, y: canvasY}
}


// function draw_point(point_context, x, y, r, isHit) {
//     point_context.clearRect(0, 0, width_canvas, height_canvas)
//     point_context.fillStyle = "rgb(255,255,255)";
//     point_context.strokeStyle = "rgb(255,255,255)";
//     point_context.setLineDash([5, 3]);
//     point_context.moveTo(width_canvas / 2 + x * 150 / r, height_canvas / 2 - 150 * y / r);
//     point_context.lineTo(width_canvas / 2, height_canvas / 2 - 150 * y / r)
//     point_context.moveTo(width_canvas / 2 + x * 150 / r, height_canvas / 2 - 150 * y / r);
//     point_context.lineTo(width_canvas / 2 + x * 150 / r, height_canvas / 2);
//     point_context.stroke();
//
//     point_context.setLineDash([]);
//     if (!isHit || isHit === "false") {
//         point_context.fillStyle = "rgb(231,37,37)";
//         point_context.strokeStyle = "rgb(241,58,58)";
//     } else {
//         point_context.fillStyle = "rgb(61,212,70)";
//         point_context.strokeStyle = "rgb(51,234,56)";
//     }
//     point_context.beginPath();
//     point_context.arc(width_canvas / 2 + x * 150 / r, height_canvas / 2 - 150 * y / r, 4, 0, 2 * Math.PI);
//     point_context.fill();
//     point_context.stroke();
//     point_context.setLineDash([]);
//     point_context.closePath();
//     point_context.strokeStyle = "rgb(255,255,255)";
//     point_context.arc(width_canvas / 2 + x * 150 / r, height_canvas / 2 - 150 * y / r, 5, 0, 2 * Math.PI);
//     point_context.stroke();
//     graph_div.scrollTo({
//         top: height_canvas / 2 - 150 - 150 * y / r,
//         left: width_canvas / 4 + x * 150 / r,
//         behavior: 'smooth'
//     });
// }

function clear_points(point_contex) {
    point_contex.clearRect(0, 0, this.width_canvas, this.height_canvas);
}

function clear_hit_point(hit_contex) {
    hit_contex.clearRect(0, 0, this.width_canvas, this.height_canvas);
}

export default Graphic;