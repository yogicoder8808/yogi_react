
// Create a simple React component that takes user input (e.g., a text input field).
// Implement functionality to display the user input dynamically on the screen as it's being typed.
// Utilize React's useState hook to manage the input state.

import React, { useState } from "react";
import './Input.css'

function TextInput(){
    const [inputValue, setInputValue] = useState('')

    const handleChange = (event)=>{
        setInputValue(event.target.value)
    } 

    return(
        <div className="input-container">
            <h1>User Input</h1>
            <input type="test" value={inputValue} onChange={handleChange} className="text-input" placeholder="Type here"/>
            <p className="input-value"> {inputValue}</p>
        </div>
    )

}

export default TextInput;
