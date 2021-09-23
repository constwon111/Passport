import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Username, setUsername] = useState("");
    const [Password2, setPassword2] = useState("");

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
    const onPassword2Handler = (event) => {
        setPassword2(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password,
            password2: Password2,
            username: Username,
        };
        // console.log("body", body);
        dispatch(registerUser(body)).then((res) => {
            if (res.payload.registerSuccess) {
                console.log("register Success");
                props.history.push("/login");
            } else {
                console.log(res.payload);
            }
        });
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <label>Name</label>
                <input
                    type="text"
                    value={Username}
                    onChange={onUsernameHandler}
                ></input>
                <label>Email</label>
                <input
                    type="email"
                    value={Email}
                    onChange={onEmailHandler}
                ></input>
                <label>password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                ></input>
                <label>password확인</label>
                <input
                    type="password"
                    value={Password2}
                    onChange={onPassword2Handler}
                ></input>
                <br />
                <button>회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
