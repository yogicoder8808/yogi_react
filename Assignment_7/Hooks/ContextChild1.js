import React from "react";
import { useContext } from "react";
import { GarageContext } from "./Context";

function Car(){

    const {carInfo}=useContext(GarageContext)
    const {brand,color}= carInfo;
   
    return(
        <p>Hi! I'm the {brand} {color} color Car</p>
    )
}

export default Car;