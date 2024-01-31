import { useReducer } from "react"

const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT-CHANGE": {
            let isInputValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    isInputValid = isInputValid && action.isValid
                } else {
                    isInputValid = isInputValid && state.inputs[inputId].isValid
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isInputValid: isInputValid
            }
        }

        default: {
            return state;
        }
    }
}


export const useForm = (initInputs, initInputValid) => {


    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initInputs,
        isInputValid: initInputValid,
    })


    const onInputHandler = (id, value, isValid) => {
        dispatch({
            type: "INPUT-CHANGE",
            value,
            isValid,
            inputId: id
        })
    }

    return [formState, onInputHandler]

}