import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    BrowserRouter,
} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Navigation from "./components/Navigation/Navigation";
// import findPasswordPage from "./components/views/findPasswordPage/findPasswordPage";

import Auth from "./hoc/auth";

import "./App.css";
function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                {/* <Route exact path="/login" component={LoginPage} /> */}
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                {/* <Route
                    exact
                    path="/findPassword"
                    component={Auth(findPasswordPage, false)}
                /> */}
                <Route
                    exact
                    path="/"
                    component={Auth(LandingPage, null, true)}
                    // component={LandingPage}
                />
                <Route
                    exact
                    path="/register"
                    component={Auth(RegisterPage, false)}
                    // component={RegisterPage}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
