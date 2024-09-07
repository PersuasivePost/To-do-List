import Edit from './Edit'
import { useState, useEffect } from "react"

export default function List() {
    const [todos, setTodos] = useState([])

    // delete function with id parameter
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));

            // if (response.ok) {
            //     console.log('Status Code:', response.status); 
            //     //
            //     setTodos(todos.filter(todo => todo.todo_id !== id));
            // } 
            // else 
            // {
            //     console.error('Failed to delete todo. Status Code:', response.status);
            // }
        } 
        catch (error) 
        {
            console.error('Error deleting todo:', error.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()
            setTodos(jsonData);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <Edit todo = {todo}/>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
