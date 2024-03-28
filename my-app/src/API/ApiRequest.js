import React from "react";
import { useState, useEffect } from "react";

function Fetching(){
    const [data, setData] = useState([]);
    const [newItemName, setnewItemName] = useState('');
    const [updatedItemName, setUpdatedItemName] = useState({});


    useEffect(() => {
        fetchData()
    }, [])

        const fetchData = async () => {
            try {
                const response = await fetch ('http://localhost:3000/movies')
                    if (!response.ok){
                        throw new Error('Failed to fetch')
                    }
                const jsonData = await response.json()
                setData(jsonData)
  
            } catch (error){
                console.log(error.message)
                setData([]);
            }
        }
  

    const deleteData = async (id) => {
        try{
            const response = await fetch(`http://localhost:3000/movies/${id}`,{
                method: 'DELETE'
            })
                if (!response.ok){
                    throw new Error('Failed to delete')
                }
                const newData = data.filter(item => item.id !== id)
                setData(newData)
        }catch (error){
         console.log(error.message)
        }
    }


    const postData = async () => {
        try {
            const response = await fetch ('http://localhost:3000/movies',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: newItemName})
            })
                if (!response.ok){
                    throw new Error('Failed to add')
                }
            const newData = await response.json()
            setData([...data,newData])
            setnewItemName('')
        } catch (error){
            console.log(error.message)
        }
    }

    const updateData = async (id) => {
        try {
            const response = await fetch (`http://localhost:3000/movies/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: updatedItemName[id]})
            })
                if (!response.ok){
                    throw new Error('Failed to update')
                }
            const updatedItem = await response.json()
            const updatedData = data.map(item => (item.id ===id ? updatedItem : item))
            setData(updatedData)
            setUpdatedItemName({...updatedItemName, [id]:''})
        } catch (error){
            console.log(error.message)
        }
    }

    return(
        <div> 
            <input
                type="text"
                value={newItemName}
                onChange={(e)=> setnewItemName(e.target.value)}
                placeholder="New Movie Name" />
            <button onClick={postData}>Add new movie</button>
            {data.length> 0? (
                <ul>
                    {data.map (item => (
                        <li key={item.id}>
                            {item.name} - 
                            <input
                                type="text"
                                value={updatedItemName[item.id] || ''}
                                onChange={(e)=> setUpdatedItemName({...updatedItemName,[item.id]: e.target.value})}/>
                            <button onClick={() => updateData (item.id)}>Update</button>
                            <button onClick={() => deleteData (item.id)}>Delete</button>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available</p>
            )
        }
        </div>   
    )

}

export default Fetching;