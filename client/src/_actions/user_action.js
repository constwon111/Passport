import axios from "axios";

export function loginUser(dataToSubmit) {
    const request = axios
        .post("/api/users/login", dataToSubmit)
        .then((response) => response.data);

    return {
        type: "LOGIN_USER",
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = axios
        .post("/api/users/register", dataToSubmit)
        .then((response) => response.data);
    // console.log("hi", request);

    return {
        type: "REGISTER_USER",
        payload: request,
    };
}

// export function auth() {
//     const request = axios
//         .get("/api/users/auth")
//         .then((response) => response.data);

//     return {
//         type: "AUTH_USER",
//         payload: request,
//     };
// }
export function auth() {
    const request = axios
        .get("/api/users/auth")
        .then((response) => response.data);
    console.log(request);

    return {
        type: "AUTH_USER",
        payload: request,
    };
}

export function getUser() {
    const request = axios
        .get("/api/users/getUser", { withCredentials: true })
        .then((response) => response.data);
    console.log(request);

    return {
        type: "GET_USER",
        payload: request,
    };
}