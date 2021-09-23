import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import googleImage from "../../../assets/googleImage.png";
import naverImage from "../../../assets/naverImage.png";

import "./LoginPage.css";

// import styles from "./LoginPage.css";

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password,
        };
        dispatch(loginUser(body)).then((res) => {
            if (res.payload.loginSuccess) {
                props.history.push("/");
            } else {
                alert(res.payload.message);
            }
        });
    };
    var googleLogin = () => {
        window.open("http://localhost:5000/api/users/auth/google", "_self");
    };
    var naverLogin = () => {
        window.open("http://localhost:5000/api/users/auth/naver", "_self");
    };

    return (
        <div className="loginPage">
            <div>
                <form
                    style={{ display: "flex", flexDirection: "column" }}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <input
                        type="email"
                        value={Email}
                        onChange={onEmailHandler}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={Password}
                        onChange={onPasswordHandler}
                    />
                    <br />
                    <button>Login</button>
                </form>
            </div>
            <div className="googleContainer" onClick={googleLogin}>
                <img src={googleImage} alt="Google Icon" />
                <p>Login With Google</p>
            </div>
            <div className="naverContainer" onClick={naverLogin}>
                <img src={naverImage} alt="naver Icon" />
                <p>Login With naver</p>
            </div>
        </div>
    );
}
export default LoginPage;
