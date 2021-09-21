import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    GET_USER,
} from "../_actions/types";

// const user = function (state = {}, action) {
//     console.log("hello");
//     switch (action.type) {
//         case LOGIN_USER:
//             return { ...state, loginSuccess: action.payload };
//             break;
//         case REGISTER_USER:
//             return { ...state, success: action.payload };
//             break;
//         default:
//             return state;
//     }
// };

// export default user;

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
            break;
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload };
            break;
        case AUTH_USER:
            return { ...state, authSuccess: action.payload };
            break;
        case GET_USER:
            return { ...state, authSuccess: action.payload };
            break;
        default:
            return state;
    }
}
