import React from "react";
import { useState, useEffect } from "react";

function App(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItemName, setnewItemName] = useState('');
    const [updatedItemName, setUpdatedItemName] = useState({});



    useEffect(() => {
        fetchData()
    }, [])

        const fetchData = async () => {
            try {
                setLoading (true)
                const response = await fetch ('http://localhost:3000/movies')
                    if (!response.ok){
                        throw new Error('Failed to fetch')
                    }
                const jsonData = await response.json()
                setData(jsonData)
                setError(null)
            } catch (error){
                setError(error.message)
                setData([]);
            }finally{
                setLoading(false)
            }
        }
  

    const deleteData = async (id) => {
        try{
            setLoading(true)
            const response = await fetch(`http://localhost:3000/movies/${id}`,{
                method: 'DELETE'
            })
                if (!response.ok){
                    throw new Error('Failed to delete')
                }
            
                const newData = data.filter(item => item.id !== id)
                setData(newData)
                setError(null)
        }catch (error){
         setError(error.message)
        }finally{
            setLoading(false)
        }
    }


    const postData = async () => {
        try {
            setLoading (true)
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
            setError(null)
            setnewItemName('')
        } catch (error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const updateData = async (id) => {
        try {
            setLoading (true)
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
            setError(null)
            setUpdatedItemName({...updatedItemName, [id]:''})
        } catch (error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div> 
            {loading && <p>Loading..</p>}
            {error && <p>Error:{error}</p>}
            <input
                type="text"
                value={newItemName}
                onChange={(e)=> setnewItemName(e.target.value)} />
            <button onClick={postData}>Add new movie</button>
            {data.length> 0? (
                <ul>
                    {data.map (item => (
                        <li key={item.id}>
                            {item.name} - 
                            <input
                                type="text"
                                value={updatedItemName[item.id] || ''}
                                onChange={(e)=> setUpdatedItemName({...updatedItemName,[item.id]: e.target.value})} />
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

export default App;