import axios from 'axios';

const url = "http://localhost:2672/api/aunt";

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_SIGN_IN = "SET_SIGN_IN";
export const SET_USER_ANSWER = 'SET_USER_ANSWER';

export function setAnswer(userAnswer) {
    return{
        type: SET_USER_ANSWER,
        payload: userAnswer
    }
}

export function authorization(data){
    return dispatch => {
        axios({
            method: "post",
            url: url + "/authorization",
            data: data,
        })
            .then(result => {
                console.log(result);
                if (Number(result.status) === 201) {
                    dispatch({
                        type: REGISTER,
                        payload: "You was successfully registered"
                    })
                } else {
                    dispatch({
                        type: REGISTER,
                        payload: "Such user has already existed, enter another login for registration.",
                    });
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: REGISTER,
                    payload: "Such user has already existed, enter another login for registration.",
                });
            })
        ;
    }
}

export function authentication(data){
    return dispatch => {
        let header = 'Basic ' + btoa(data.username + ':' + data.password);
        axios({
            url: url +"/authentication",
            method: 'post',
            headers: {
                Authorization: header
            },
        })
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    localStorage.setItem("loginIn", header);
                    alert("Welcome!")
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: "Welcome!",
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true,
                    });
                } else {
                    alert("Incorrect login or password")
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: "Incorrect login or password",
                    })
                }
            })
            .catch(result => {
                alert("Incorrect login or password")
                console.log(result);
                dispatch({
                    type: LOGIN_FAIL,
                    payload: "Incorrect login or password",
                })
            });
    }
}