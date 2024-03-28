
// Design a user inter+B23:B46face for a To-Do List application using HTML and CSS.

import React, { useState } from "react";
import'./Todo.css'

function Todo(){
    const[todo,setTodo]=useState([]);
    const[input,setInput]=useState('');

    const addTodo = ()=>{
        if(input !==''){
            setTodo([...todo,input])
            setInput('')
        }
    };

    
    const removeTodo = (index)=>{
            const newTodo=[...todo];
            newTodo.splice(index,1)
            setTodo(newTodo)
        }
        // const newTodo = todo.filter((_,i)=>i!==index);
        // setTodo(newTodo)

    return(
        <div className="app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input type="text" value={input} onChange={(Event)=>setInput(Event.target.value)}/>
                <button onClick={addTodo}>Add</button>
            </div>

            <ul className="todo-list">
                {todo.map((todos,index)=>(
                    <li key={index}>
                        {todos}
                        <button onClick={()=>removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Todo;