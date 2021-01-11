import React from "react";
import {form_container} from "./form.module.scss";
import {input_container} from "./form.module.scss";
import Alert from "../../Alert/Alert";
import {authentication, authorization} from "../../../actions/loginActions"

class Form extends React.Component {
    constructor(props) {
        super(props);
        // this.props.setAnswer("");
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    render() {
        return (
            <div className={form_container}>
                <div className={input_container}>
                    <input  id="login" required="true"  placeholder="Login"/>
                    <input  id="password" required="true" type="password" placeholder="Password"/>
                </div>
                <div>
                    <input type="submit" value="sign in" onClick={this.signIn}/>
                    <input type="submit" value="sign up" onClick={this.signUp}/>
                </div>
            </div>
        );
    }

    signIn() {
        let alert_login = document.getElementById("alert_login");
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === null || login === "") {
            alert("Fill login gap please")
            // alert_login.innerHTML = "Fill login gap please"
        } else if (password === null || password === "") {
            alert("Fill password gap please")
            // alert_login.innerHTML = "Fill login gap please"
        } else {
            let data = {
                username: login,
                password: password
            }
            // alert_login.style.display = "none";
            authentication(data);
        }

    }

    signUp() {
        let login = document.getElementById("login").value.trim();
        let password = document.getElementById("password").value.trim();
        if (login === null || login === "") {
            alert("Fill login gap please")
            // alert_login.innerHTML = "Fill login gap please"
        } else if (password === null || password === "") {
            alert("Fill password gap please")
            // alert_login.innerHTML = "Fill login gap please"
        } else {
            let data = {
                username: login,
                password: password
            }
            // alert_login.style.display = "none";
            authorization(data);
        }

    }
}
export default Form;