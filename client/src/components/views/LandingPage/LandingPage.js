import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./LandingPage.css";
import { auth } from "../../../_actions/user_action";
import { Link } from "react-router-dom";

function LandingPage(props) {
    const [Auth, setAuth] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then((response) => {
            setAuth(false);
            console.log(response.payload.isAuth);
            if (response.payload.isAuth) setAuth(true);
            else setAuth(false);
        });
    }, []);

    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.data.logoutSuccess) alert("로그아웃 성공했습니다");
            else {
                alert("로그아웃 실패했습니다");
            }
            props.history.push("/login");
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
            <h2> 시작페이지</h2>
            <div className="logButton">
                {Auth ? (
                    <Link to="/" onClick={onClickHandler}>
                        로그아웃
                    </Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}

                <Link to="/register">회원가입</Link>
                {/* <Link to="/password">비밀번호 찾기</Link> */}

                {/* <Link to="/" onClick={onClickHandler}>
                    로그아웃
                </Link> */}
            </div>
        </div>
    );
}

export default LandingPage;
