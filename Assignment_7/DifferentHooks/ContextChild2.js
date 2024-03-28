import React from "react";
import { useContext } from "react";
import { CreateContext } from "./Context";

function ContextChild2(){

    const {name}=useContext(CreateContext)
    return(
        <p>Name: {name}</p>
    )
}

export default ContextChild2;