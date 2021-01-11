import React from "react";
import {alert_container} from "./Alert.module.scss";
class Alert extends React.Component{
    render() {
        return(
            <div className={alert_container}>
                {this.props.children}
            </div>
        );
    }
}

export default Alert;