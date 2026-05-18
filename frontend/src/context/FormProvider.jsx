import { useReducer } from "react";
import FormContext from "./FormContext";

const ACTIONS = {
    CHANGE: "CHANGE",
    LOAD: "LOAD",
    UNLOAD: "UNLOAD"
}

const FormProvider = ({ children }) => {
    const formReducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.CHANGE:
                return { ...state, [action.field]: action.value };
            case ACTIONS.LOAD:
                return { ...state, isLoading: true };
            case ACTIONS.UNLOAD:
                return { ...state, isLoading: false };
            default:
                throw new Error(`Unknown Action: ${action.type}`);
        }
    }
    const [state, dispatch] = useReducer(formReducer, { name: "", email: "", password: "", isLoading: false });
    const load = () => dispatch({ type: ACTIONS.LOAD });
    const stopLoading = () => dispatch({ type: ACTIONS.UNLOAD });
    return (
        <FormContext.Provider value={{
            ACTIONS,
            state,
            dispatch,
            load,
            stopLoading
        }}>
            { children  }
        </FormContext.Provider>
    )
}

export default FormProvider;