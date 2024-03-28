
// Implement functionality to add new tasks to the list, mark tasks as completed, and delete tasks.

import React, { useState } from "react";
import'./Todo.css'

function Todo(){
    const[todo,setTodo]=useState([]);
    const[input,setInput]=useState('');

    const addTodo = ()=>{
        if(input !==''){
            setTodo([...todo, {text: input, completed: false}])
            setInput('')
        }
    };

    const toggleComplete= (index)=>{
        const newTodo=[...todo]
        newTodo[index].completed=!newTodo[index].completed
        setTodo(newTodo);
    }

    
    const removeTodo = (index)=>{
            const newTodo=[...todo];
            newTodo.splice(index,1)
            setTodo(newTodo)
        }

    return(
        <div className="app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input type="text" value={input} onChange={(Event)=>setInput(Event.target.value)}/>
                <button onClick={addTodo}>Add</button>
            </div>

            <ul className="todo-list">
                {todo.map((todos,index)=>(
                    <li key={index} className={todos.completed ? 'completed' : ''}>
                        <span onClick={()=> toggleComplete(index)}>
                            {todos.text}
                        </span>
                        <button onClick={()=>removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Todo;