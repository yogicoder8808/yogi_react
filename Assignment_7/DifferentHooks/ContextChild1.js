import React from "react";
import { useContext } from "react";
import { CreateContext } from "./Context";

function ContextChild1(){
 
    const {setName}=useContext(CreateContext);
    return(
        <input type="text" 
        onChange={(e)=> setName(e.target.value)}/>
    )
}

export default ContextChild1;