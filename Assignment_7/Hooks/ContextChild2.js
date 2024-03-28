import React from "react";
import { useContext } from "react";
import { GarageContext } from "./Context";

function Bike(){

    const {bikeInfo}=useContext(GarageContext)
    const {brand, color}=bikeInfo;

    return(
        <p>Hi! I'm the {brand} {color} color Bike</p>
    )
}

export default Bike;