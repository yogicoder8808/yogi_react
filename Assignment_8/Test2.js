// Choose an external API (e.g., weather API, movie database API, etc.).
// Create a React component that fetches data from the chosen API.
// Display the fetched data in your application (e.g., weather information, movie details, etc.).
// Utilize React's useEffect hook to manage the API requests.

import React from "react";
import { useState, useEffect } from "react";
import './Test.css'

function Fetch4(){
    const [data, setData] = useState({name: '',ratings: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    


useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading (true)
            const response = await fetch ('http://localhost:3000/movies')
            handleResponse (response)
        } catch (error){
            handleError(error)
        }
    }
    fetchData()
}, [])

    const handleResponse = async (response) => {
        if(!response.ok){
            throw new Error ('Failed to fetch data')
        }
    const jsonData = await response.json()
    setData(jsonData)
    setError(null)
    setLoading(false)
    }

const handleError = (error) => {
    setError(error.message);
    setData(null)
    setLoading(false)
    }

const postData = async () => {
    try{
        setLoading(true)
        const response = await fetch ('http://localhost:3000/movies',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: 'Titanic',
                ratings: 'aaaa'
            })
        })
        handleResponse(response);
    }catch (error){
        handleError(error)
    }
}

    const updateData = async (id) => {
        try{
            setLoading(true);
            const response = await fetch ('http://localhost:3000/movies/:id',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'The Shawshank',
                    ratings: 'bbbb'
                })
            })
            handleResponse(response)
        }catch(error){
            handleError(error)
        }
    }

    const deleteData = async (id) => {
        try{
            setLoading(true)
            const response = await fetch('http://localhost:3000/movies/:id',{
                method: 'DELETE'
            })
            handleResponse(response)
        }catch (error){
            handleError(error)
        }
    }

    return(
        <div>
            {loading && <p>Loading..</p>}
            {error && <p>Error:</p>}
            {data.map (user =>(
            <div key={user.id}> 
                    <p>{user.name}</p>
                    <p>{user.ratings}</p>

                </div>
            ))}
                
            <button onClick={postData}>Post Data</button>
            <button onClick={updateData}>Put Data</button>
            <button onClick={deleteData}>Delete Data</button>
        </div>
    )

}

export default Fetch4;