import { useReducer } from "react";
import FormContext from "./FormContext";

const ACTIONS = {
    CHANGE: "CHANGE",
    LOAD: "LOAD",
    UNLOAD: "UNLOAD",
    RESET: "RESET"
}

const initialState = { 
    name: "", 
    email: "", 
    password: "", 
    confirmEmail: "",
    isLoading: false 
};

const FormProvider = ({ children }) => {
    const formReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.CHANGE:
                return { ...state, [action.field]: action.value };
            case ACTIONS.LOAD:
                return { ...state, isLoading: true };
            case ACTIONS.UNLOAD:
                return { ...state, isLoading: false };
            case ACTIONS.RESET:
                return { ...initialState };
            default:
                throw new Error(`Unknown Action: ${action.type}`);
        }
    }
    const [state, dispatch] = useReducer(formReducer, initialState);
    const load = () => dispatch({ type: ACTIONS.LOAD });
    const stopLoading = () => dispatch({ type: ACTIONS.UNLOAD });
    const reset = () => dispatch({ type: ACTIONS.RESET });
    return (
        <FormContext.Provider value={{
            ACTIONS,
            state,
            dispatch,
            load,
            stopLoading,
            reset
        }}>
            { children  }
        </FormContext.Provider>
    )
}

export default FormProvider;