import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDescription(todo.description); 
  };

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      if (response.ok) {
        window.location = "/";
      } else {
        console.error("Failed to update the description");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        onClick={openModal}
      >
        Edit
      </button>

      {isModalOpen && (
        <div className="modal" id={`id${todo.todo_id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={updateDescription}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;
