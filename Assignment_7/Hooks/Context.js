import Bike from "./ContextChild2";
import Car from "./ContextChild1";
import { createContext } from "react";

export const GarageContext = createContext(null)


function Garage(){

        const carInfo = { brand: "BMW", color: 'Red'}
        const bikeInfo= { brand: "Pulsar", color: 'Black'}

        return(
            <>

            <GarageContext.Provider value={{carInfo, bikeInfo}}>
                <h1>Who Lives here?</h1>
                <Car/>
                <Bike/>
            </GarageContext.Provider> 

            </>
        )

}

export default Garage;
