// Choose an external API (e.g., weather API, movie database API, etc.).
// Create a React component that fetches data from the chosen API.
// Display the fetched data in your application (e.g., weather information, movie details, etc.).
// Utilize React's useEffect hook to manage the API requests.

import React from "react";
import { useState, useEffect } from "react";
import './Api.css'

function Fetch() {

    const [info, setInfo] = useState([]);
    const [newInfo, setNewInfo] = useState({movie_id: '',original_title: '' });
    const [editInfo, setEditInfo] = useState(null);

    useEffect(() => {
      fetchMovies()
    }, []);

    const fetchMovies = ()=>{
      fetch('https://jsonfakery.com/movies/random/10')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setInfo(data)
          
        });
    }


    const addMovie = ()=>{
      fetch('https://jsonfakery.com/movies/random/10',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newInfo)
      })
        .then((response) => {
          if(response.ok){
            setNewInfo({movie_id: '',original_title: '' })
            fetchMovies();
          }
        })
      };


        const editMovie = (id)=>{
          fetch(`https://jsonfakery.com/movies/random/10/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(editInfo)
          })
            .then((response) => {
              if(response.ok){
                setEditInfo(null)
                fetchMovies();
              }
            })

          };

          const deleteMovie = (id)=>{
            fetch(`https://jsonfakery.com/movies/random/10/${id}`,{
              method: 'DELETE',
            })
              .then((response) => {
                if(response.ok){
                  fetchMovies();
                }
              })
  
            };

    return (
      <div>
        <table className="my-table">
            <thead>
                <tr>
                  <th>Movie_id</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {info.map(infos=>(
                    <tr key={infos.id}>
                    <td>{infos.movie_id}</td>
                    <td>{infos.original_title}</td>
                    <td>
                        <button onClick={()=>setEditInfo(infos)}>Edit</button>
                        <button onClick={()=>deleteMovie(infos.id)}>Delete</button>
                    </td>
                </tr>
                ))}             
         
            <tr>
              <td><input 
                  type="text" 
                  value={newInfo.movie_id}
                  onChange={(e)=>setNewInfo({...newInfo, movie_id: e.target.value})}
                  placeholder="Movie-id"/></td>
              <td><input 
                  type="text" 
                  value={newInfo.original_title}
                  onChange={(e)=>setNewInfo({...newInfo, original_title: e.target.value})}
                  placeholder="Title"/></td>
              <td><button onClick={addMovie}>Add Movie</button></td>
            </tr>

                  {editInfo && (
                        <tr>
                          <td><input 
                              type="text"
                              value={editInfo.movie_id} 
                              onChange={(e)=>setEditInfo({...editInfo, movie_id: e.target.value})}
                              placeholder="Edit Movie-id"/></td>
                          <td><input 
                              type="text"
                              value={editInfo.original_title}
                              onChange={(e)=>setEditInfo({...editInfo, original_title: e.target.value})} 
                              placeholder="Edit Title"/></td>
                          <td>
                            <button onClick={()=>editMovie(editInfo.id)}>Save</button>
                            <button onClick={()=>setEditInfo(null)}>Cancel</button>
                          </td>
                        </tr>
                    )}
            </tbody>
        </table>
        
      </div>
    );
  };
  export default Fetch;