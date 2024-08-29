import { useState } from "react"

export default function Input() {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try 
        {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            // console.log(response);
            window.location = "/"
            
        } 
        catch (error) 
        {
            console.error(error.message)
        }
    }

    return (
        <div className="container">
            <h1 className="text-center">Pern TodoList</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" value={description} onChange={e => {
                    setDescription(e.target.value)
                }}/>
                <button className="add-btn">Add</button>
            </form>
        </div>
    ) 
}