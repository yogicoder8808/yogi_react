

import React, { useEffect, useState } from "react";
import'./Todo.css'

function Todo(){
    const[todo,setTodo]=useState([]);
    const[input,setInput]=useState('');
    const[filter,setFilter]=useState('all');



// 2. Implement functionality to add new tasks to the list, mark tasks as completed, and delete tasks.

    const toggleComplete= (index)=>{
        const newTodo=[...todo]
        newTodo[index].completed=!newTodo[index].completed
        setTodo(newTodo);
    }



// 3. Use Local Storage to persist the To-Do List data across page refreshes.

    useEffect(()=>{
        const storedTodo=localStorage.getItem('todo')
        if(storedTodo){
            setTodo(JSON.parse(storedTodo))
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('todo',JSON.stringify(todo))
    },[todo]);


// 4. Add validation to prevent adding empty tasks or tasks with duplicate names.

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

// 1. Design a user inter+B23:B46face for a To-Do List application using HTML and CSS.

    const removeTodo = (index)=>{
            const newTodo=[...todo];
            newTodo.splice(index,1)
            setTodo(newTodo)
        }

// 5. Enhance the application by adding features like filtering tasks by status (completed/incomplete) or sorting tasks by priority.

    const filteredTodo=filter==='completed'? todo.filter(todos =>todos.completed) :
                       filter==='incomplete'? todo.filter(todos =>!todos.completed) : todo;


    return(
        <div className="app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input type="text" value={input} onChange={(Event)=>setInput(Event.target.value)}/>
                <button onClick={addTodo}>Add</button>
            </div>

        <div className="filter-button">
            <button className="btn1" onClick={()=>setFilter('all')}>All</button>
            <button onClick={()=>setFilter('completed')}>Completed</button>
            <button onClick={()=>setFilter('incomplete')}>Incompleted</button>
        </div>

            <ul className="todo-list">
                {filteredTodo.map((todos,index)=>(
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