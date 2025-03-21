'use client';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaCheck, FaTimes, FaTrash, FaSpinner } from "react-icons/fa";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/todos");
        const data = await res.json();

<<<<<<< HEAD
        const indexedTodos = data.map((todo, index) => ({
          ...todo,
          originalIndex: index, 
=======
        // Store original position when first fetched
        const indexedTodos = data.map((todo, index) => ({
          ...todo,
          originalIndex: index, // Store its original position
>>>>>>> 4c78350 (Updated todo list logic to maintain original task order when undone)
        }));
        setTodos(indexedTodos);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addNewTask = async () => {
    if (newTodo.trim() === "") {
      toast.error("Please enter a valid task!");
      return;
    }
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTodo }),
    });

    const newTask = await res.json();
    setTodos((prevTodos) => [
      ...prevTodos,
<<<<<<< HEAD
      { ...newTask, originalIndex: prevTodos.length }, 
=======
      { ...newTask, originalIndex: prevTodos.length }, // Store current index
>>>>>>> 4c78350 (Updated todo list logic to maintain original task order when undone)
    ]);
    setNewTodo("");
    toast.success("Task added successfully!");
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditValue(todo.task);
  };

  const saveEdit = async () => {
    if (editValue.trim() === "") {
      toast.error("Please enter a valid task!");
      return;
    }

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingTodo._id,
        task: editValue,
        isdone: editingTodo.isdone,
      }),
    });

    const updatedTodo = await res.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );

    setEditingTodo(null);
    setEditValue("");
    toast.success("Task updated successfully!");
  };

  const markAsDone = async (_id, isdone) => {
<<<<<<< HEAD
    const updatedTodos = [...todos];

    const index = updatedTodos.findIndex((todo) => todo._id === _id);
    if (index === -1) return;

    
=======
    const updatedTodos = [...todos]; // Copy array

    // Find the index of the task being updated
    const index = updatedTodos.findIndex((todo) => todo._id === _id);
    if (index === -1) return;

    // Fetch updated task from API
>>>>>>> 4c78350 (Updated todo list logic to maintain original task order when undone)
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: _id, isdone: !isdone }),
    });

    const updatedTodo = await res.json();
    
    if (!isdone) {
<<<<<<< HEAD
      
      updatedTodo.originalIndex = index;
      updatedTodos.splice(index, 1); 
      updatedTodos.push(updatedTodo); 
    } else {
      
      updatedTodos.splice(index, 1); 
      updatedTodos.splice(updatedTodo.originalIndex, 0, updatedTodo); 
=======
      // Store original index before moving
      updatedTodo.originalIndex = index;
      updatedTodos.splice(index, 1); // Remove from current position
      updatedTodos.push(updatedTodo); // Move to bottom
    } else {
      // Restore previous position when undone
      updatedTodos.splice(index, 1); // Remove from bottom
      updatedTodos.splice(updatedTodo.originalIndex, 0, updatedTodo); // Insert back at stored index
>>>>>>> 4c78350 (Updated todo list logic to maintain original task order when undone)
    }

    setTodos(updatedTodos);
    toast.success(isdone ? "Task marked as undone!" : "Task completed!");
  };

  const deleteTodo = async (_id) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    });

    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    toast.success("Task deleted successfully!");
  };

  return (
    <div>
      <div className="input-container">
        <h1>TodoList With Next.js</h1>

        <input
          placeholder="Add a task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNewTask();
            }
          }}
        />
        <br />
        <br />
        <button onClick={addNewTask}>Add Task</button>
      </div>

      <h2>Tasks Todo</h2>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <div className="main">
          {todos.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <div className="todo-container">
                  {editingTodo && editingTodo._id === todo._id ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={saveEdit}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEdit();
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-content"
                      style={{
                        textDecoration: todo.isdone ? "line-through pink" : "none",
                      }}
                    >
                      <ul className="content-item">
                        <li>&hearts;</li>
                        <li> {todo.task}</li>
                      </ul>
                    </div>
                  )}
                  <div className="todo-actions">
                    {!editingTodo || editingTodo._id !== todo._id ? (
                      <button
                        className="todo-button edit-button"
                        onClick={() => editTodo(todo)}
                      >
                        <FaEdit className="icon edit-icon" />
                      </button>
                    ) : null}

                    <button
                      className="todo-button done-button"
                      onClick={() => markAsDone(todo._id, todo.isdone)}
                    >
                      {todo.isdone ? (
                        <FaTimes className="icon undo-icon" />
                      ) : (
                        <FaCheck className="icon done-icon" />
                      )}
                    </button>

                    <button
                      className="todo-button delete-button"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <FaTrash className="icon delete-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}




