// Add validation to prevent adding empty tasks or tasks with duplicate names.

import React, { useEffect, useState } from "react";
import'./Todo.css'

function Todo(){
    const[todo,setTodo]=useState([]);
    const[input,setInput]=useState('');

useEffect(()=>{
    const storedTodo=localStorage.getItem('todo')
    if(storedTodo){
        setTodo(JSON.parse(storedTodo))
    }
}, []);

useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(todo))
},[todo]);

    const addTodo = ()=>{
        if(input ===''){
            alert('Empty Input')
            return;
        }

        if(todo.some(todos=>todos.text === input)){
            alert('Same Input already Exists!')
            return;
        }
            setTodo([...todo, {text: input, completed: false}])
            setInput('')
        
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