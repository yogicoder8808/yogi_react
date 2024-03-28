// Choose an external API (e.g., weather API, movie database API, etc.).
// Create a React component that fetches data from the chosen API.
// Display the fetched data in your application (e.g., weather information, movie details, etc.).
// Utilize React's useEffect hook to manage the API requests.

import React from "react";
import { useState, useEffect } from "react";
import './Test.css'

function Fetch1() {

    const [info, setInfo] = useState([]);
    const [newInfo, setNewInfo] = useState({name: '',ratings: '' });
    const [editInfo, setEditInfo] = useState(null);

    useEffect(() => {
      fetchUsers()
    }, []);

    const fetchUsers = async()=>{
        try{
            const response= await fetch('http://localhost:3000/movies')
            const data = await response.json();
            console.log(data)
            setInfo(data)
        } catch(error){
            console.error('Error fetching Movie info:', error)
        }
        }


    const addUser = async()=>{
        try{
            const response = await fetch ('http://localhost:3000/movies',{
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json', 
                         },
                body: JSON.stringify({newInfo})
              })

              if(response.ok){
                setNewInfo({name: '',ratings: '' })
                fetchUsers();
                }
            } catch(error){
                console.error('Error adding movies info:', error)
                }
        }
    
    const editUser = async(id)=>{
        try{
            const response = await fetch (`http://localhost:3000/movies ${id}`,{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',  
                         },
                body: JSON.stringify({editInfo})
              })

              if(response.ok){
                setEditInfo(null)
                fetchUsers();
                }
            }catch(error){
                console.error('Error editing movies info:', error)
                }

          
        };

          const deleteUser = async (id)=>{
            try{
                const response = await fetch(`http://localhost:3000/movies ${id}`,{
                    method: 'DELETE',
                    headers: { 
                      'Content-Type': 'application/json',
                         },
                  })

                if(response.ok){
                    fetchUsers();
                }
            } catch (error){
                console.error('Error deleting movies info:', error)
                }
        };

    return (
      <div>
        <table className="my-table">
            <thead>
                <tr>
                  <th>Name</th>
                  <th>Ratings</th>
                  <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {info.map(infos=>(
                    <tr key={infos.id}>
                    <td>{infos.name}</td>
                    <td>{infos.ratings}</td>
                    <td>
                        <button onClick={()=>setEditInfo(infos)}>Edit</button>
                        <button onClick={()=>deleteUser(infos.id)}>Delete</button>
                    </td>
                </tr>
                ))}             
         
            <tr>
              <td><input 
                  type="text" 
                  value={newInfo.name}
                  onChange={(e)=>setNewInfo({...newInfo, name: e.target.value})}
                  placeholder="Name"/></td>
              <td><input 
                  type="text" 
                  value={newInfo.ratings}
                  onChange={(e)=>setNewInfo({...newInfo, ratings: e.target.value})}
                  placeholder="ratings"/></td>
              <td><button onClick={addUser}>Add User</button></td>
            </tr>

                  {editInfo && (
                        <tr>
                          <td><input 
                              type="text"
                              value={editInfo.name} 
                              onChange={(e)=>setEditInfo({...editInfo, name: e.target.value})}
                              placeholder="Edit user"/></td>
                          <td><input 
                              type="text"
                              value={editInfo.ratings}
                              onChange={(e)=>setEditInfo({...editInfo, ratings: e.target.value})} 
                              placeholder="Edit Email"/></td>
                          <td>
                            <button onClick={()=>editUser(editInfo.id)}>Save</button>
                            <button onClick={()=>setEditInfo(null)}>Cancel</button>
                          </td>
                        </tr>
                    )}
            </tbody>
        </table>
        
      </div>
    );
  };
  export default Fetch1;