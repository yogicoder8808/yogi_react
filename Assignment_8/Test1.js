import React from "react";
import { useState, useEffect } from "react";
import './Test.css'

function Fetch2() {

    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState('');
    const [editedMovie, setEditedMovie] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchMovies()
    }, []);

    const fetchMovies = async()=>{
        try{
            const response= await fetch('https://jsonplaceholder.typicode.com/users')
            if(!response.ok){
                throw new Error ('Failed to fetch movies')
            }
            const data = await response.json();
            console.log(data)
            setMovies(data)
            setError(null)
        } catch(error){
            console.error('Error fetching users info:', error)
            setError(error.message)
        }
    }


    const addMovie = async()=>{
        try{
            const response = await fetch ('https://jsonplaceholder.typicode.com/users',{
                method: 'POST',
                headers: { 
                        'Content-Type': 'application/json',   
                         },
                body: JSON.stringify({name: newMovie})
              })

              if(!response.ok){
                throw new Error ('Failed to add movies')
            }
              await fetchMovies();
            } catch(error){
                console.error('Error adding users info:', error)
                setError(error.message)
                }
        }
    
    const editMovie = async(id)=>{
        try{
            const response = await fetch (`https://jsonplaceholder.typicode.com/users ${id}`,{
                method: 'PUT',
                headers: { 
                            'Content-Type': 'application/json',
                         },
                body: JSON.stringify({name: editedMovie})
              })

              if(!response.ok){
                throw new Error ('Failed to edit movies')
            }

              await fetchMovies();
            }catch(error){
                console.error('Error editing movies info:', error)
                setError(error.message)
                
                }
        };

        const deleteMovie = async (id)=>{
            try{
                const response = await fetch(`https://jsonplaceholder.typicode.com/users ${id}`,{
                    method: 'DELETE',
                  })

                  if(!response.ok){
                    throw new Error ('Failed to delete movies')
                }

                  await fetchMovies();
            } catch (error){
                console.error('Error deleting movies info:', error)
                setError(error.message)
                }
        };

    return (
      <div>
            <h1>Movies</h1>
            {error && <div>Error: {error}</div>}
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.name}
                        <button onClick={()=>deleteMovie(movie.id)}>Delete</button>
                        <input type="text" value={editedMovie} onChange={(e)=>setEditedMovie(e.target.value)} />
                        <button onClick={()=> editMovie(movie.id)}> Edit</button>
                    </li>

                ))}
            </ul>
            <input type="text" value={newMovie} onChange={(e)=>setNewMovie(e.target.value)} />
            <button onClick={addMovie}>Add Movie</button>
        
      </div>
    );
  };
  export default Fetch2;