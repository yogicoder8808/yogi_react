// Create a new React component and convert class-based component to functional component using useState hook.

import React, { Component } from "react";

class ClassCar extends Component{
    constructor(){
        super();
        this.state = {
            make: 'TATA',
            model: 'EV',
            year: 2022
        }
    }

    render(){
        return(

            <>
            <h1>Car Info</h1>
            <p>Make: {this.state.make}</p>
            <p>Model: {this.state.model}</p>
            <p>Year: {this.state.year}</p>

            <button onClick={()=>{
                this.setState ({
                    make: 'Audi',
                    model: 'S10',
                    year: 2023
                    
                })

            }}>New Car Info </button>
        </>

        )
    }

}

export default ClassCar;