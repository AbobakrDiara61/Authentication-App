import { useReducer } from "react";
import AuthContext from './AuthContext'
const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    UPDATE_USER: "UPDATE_USER",
    START_LOADING: "START_LOADING",
    STOP_LOADING: "STOP_LOADING"
}
const AuthProvider = ({ children }) => {
    const authReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.LOGIN:
                return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true
                };
            case ACTIONS.LOGOUT:
                return {
                    ...state,
                    user: null,
                    isAuthenticated: false
                };
            case ACTIONS.UPDATE_USER: 
                return { 
                    ...state, 
                    user: { 
                        ...state.user, 
                        ...action.payload 
                    } 
                };
            case ACTIONS.START_LOADING:
                return {
                    ...state,
                    loading: true
                };
            case ACTIONS.STOP_LOADING:
                return {
                    ...state,
                    loading: false
                };
            default:
                throw new Error(`Unknown Action: ${action.type}`);
        }
    }
    const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false, loading: true });

    const login = (user) => {
        dispatch({
            type: ACTIONS.LOGIN,
            payload: user
        });
    }

    const logout = () => {
        dispatch({
            type: ACTIONS.LOGOUT
        });
    }
    
    const updateUser = (updates) => { 
        dispatch({ 
            type: ACTIONS.UPDATE_USER, payload: updates 
        }); 
    };
    
    const startLoading = () => dispatch({ type: ACTIONS.START_LOADING });
    const stopLoading = () => dispatch({ type: ACTIONS.STOP_LOADING });
    
    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout,
            updateUser,
            startLoading,
            stopLoading,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;