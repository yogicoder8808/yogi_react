import { useState, createContext } from "react";
import ContextChild1 from "./ContextChild1";
import ContextChild2 from "./ContextChild2";

export const CreateContext=createContext(null);

function Context(){
    const [name,setName] = useState("")

    return(
        <>
            <CreateContext.Provider value = {{name,setName}} >
                <h1>React Use Context</h1>
                <ContextChild1/>
                <ContextChild2 />
            </CreateContext.Provider>
            
        </>
        
    )

}

export default Context;