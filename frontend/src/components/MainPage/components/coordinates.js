import React from "react";
import {coordinates_container} from "./scss/coordinates.module.scss";
import {radio_container} from "./scss/coordinates.module.scss";
import {r_container} from "./scss/coordinates.module.scss";
import {coordinate_input} from "./scss/coordinates.module.scss";
import {part_container} from "./scss/coordinates.module.scss";
import {button} from "./scss/coordinates.module.scss";
import {label1} from "./scss/coordinates.module.scss";
import {label2} from "./scss/coordinates.module.scss";
class Coordinates extends React.Component {
    render() {
        return (
            <div className={coordinates_container}>
                <h2>coordinates</h2>
                <div className={part_container}>
                    <label>X</label>
                    <input className={coordinate_input} id="X" placeholder="-3...3" autoComplete="true"/>
                </div>
                <div className={part_container}>
                    <label>Y</label>
                    <input className={coordinate_input} id="Y" placeholder="-5...3"/>
                </div>
                <div className={r_container}>
                    <div className={part_container}>
                        <div className={radio_container}>
                            <input className={radio_container} id="radio_0.5" type="radio" name="R" value="0.5"/>
                            <label className={label1} htmlFor="radio_0.5">0.5</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_1" type="radio" name="R" value="1"/>
                            <label className={label2}  htmlFor="radio_1">1</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_1.5" type="radio" name="R" value="1.5"/>
                            <label className={label1} htmlFor="radio_1.5">1.5</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_2" type="radio" name="R" value="2"/>
                            <label className={label2} htmlFor="radio_2">2</label>
                        </div>
                    </div>
                    <div className={part_container}>
                        <div className={radio_container}>
                            <input id="radio_2.5" type="radio" name="R" value="2.5"/>
                            <label className={label1} htmlFor="radio_2.5">2.5</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_3" type="radio" name="R" value="3"/>
                            <label className={label2} htmlFor="radio_3">3</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_3.5" type="radio" name="R" value="3.5"/>
                            <label className={label1} htmlFor="radio_3.5">3.5</label>
                        </div>
                        <div className={radio_container}>
                            <input id="radio_4" type="radio" name="R" value="4"/>
                            <label className={label2} htmlFor="radio_4">4</label>
                        </div>
                    </div>
                </div>
                <div className={part_container}>
                    <input className={button} type="submit" id="send" value="send"></input>
                    <input className={button} type="reset" id="reset" value="reset"></input>
                </div>
            </div>);
    }
}

export default Coordinates;

