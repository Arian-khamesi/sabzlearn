import React from 'react'

import './Input.css'

export default function Input(props) {

    const inputChangeHandler = (event) => {
        console.log(event.target.value)
    }

    const children = props.element === 'input' ? (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={props.className}
            onChange={inputChangeHandler}
        />
    ) : (<textarea
        placeholder={props.placeholder}
        className={props.className}
    />)


    return (
        <div>
            {children}
        </div>
    )
}
