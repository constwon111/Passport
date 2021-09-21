import React, { useContext } from "react";
import styles from "./Navigation.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBarWrapper">
            <ul className="navBar">
                <li>
                    <Link to="/">Home</Link>
                </li>

                {/* <li onClick={logout}>Logout </li> */}

                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
}
