import React, { useReducer } from 'react'

import './Input.css'

import validator from '../../validators/validator'

export default function Input(props) {

    const inputReducer = (state, action) => {

        switch (action.type) {
            case 'CHANGE': {
                return {
                    ...state,
                    value: action.value,
                    isValid: validator(action.value, action.validations)
                }
            }
            default: {
                return state
            }
        }
    }

    const [maininput, dispatch] = useReducer(inputReducer,
        {
            value: '',
            isValid: false
        })

    const inputChangeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            validations: props.validations,
            isValid: true
        })
    }

    const children = props.element === 'input' ? (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={`${props.className} ${maininput.isValid ? ('success') : ('error')}`}
            value={maininput.value}
            validations={props.validations}
            onChange={inputChangeHandler}
        />
    ) : (<textarea
        placeholder={props.placeholder}
        className={props.className}
        value={maininput.value}
        validations={props.validations}
        onChange={inputChangeHandler}
    />)


    return (
        <div>
            {children}
        </div>
    )
}
