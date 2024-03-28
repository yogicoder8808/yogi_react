import React, { useEffect, useState } from "react";
function Counter(){
    const [count, setCount] = useState(0);

    useEffect(()=>{
        console.log('Fetching Data')
    },[])

    return(
        <>
            <p>Count: {count}</p>
            <button onClick={()=>setCount(count+1)}>Increament</button>
        </>
    )

}

export default Counter;