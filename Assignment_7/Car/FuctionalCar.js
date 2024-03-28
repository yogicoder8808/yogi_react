// Create a new React component and convert class-based component to functional component using useState hook.

import React, { useState } from "react";

function FunctionalCar(){

    const[make,setmake] = useState('TATA')
    const[model,setModel] = useState('EV')
    const[year,setYear] = useState(2022)

    return(
        <>
            <h1>Car Info</h1>
            <p>Make: {make}</p>
            <p>Model: {model}</p>
            <p>Year: {year}</p>

            <button onClick={()=>{
                setmake('AUDI')
                setModel('S10')
                setYear(2023)

            }}>New Car Info</button>
        </>
    )

}

export default FunctionalCar;