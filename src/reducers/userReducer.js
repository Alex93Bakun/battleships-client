const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';
const REG_VALIDATE = 'REG_VALIDATE';

const defaultState = {
    currentUser: {},
    isAuth: false,
    isReg: false
}

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case REG_VALIDATE:
            return{
                ...state,
                currentUser: {},
                isAuth: false,
                isReg: true
            }
        default:
            return state
    }
};

export const setUser = user => ({type: SET_USER, payload: user});
export const logout = () => ({type: LOGOUT});
export const regUser = () => ({type: REG_VALIDATE});

export default userReducer;
