import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload // הדאטא של היוזר מועבר בPAYLOAD
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:  // במקרה של הרשמה מוצלחת
            localStorage.setItem('token', action.payload.token) // מאחסנים את הטוקן בלוקל סטורז'
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token') // במקרים הנ"ל מוחקים את הטוקן מהלוקל סטורז ומאפסים את הכול
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
