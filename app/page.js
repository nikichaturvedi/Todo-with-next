'use client';

import { useState, useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);  
  const [editValue, setEditValue] = useState("");  
  
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  
  const addNewTask = async () => {
    if (newTodo.trim() === "") {
      alert("Please enter a valid task!");
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
    setTodos((prevTodos) => [newTask, ...prevTodos]);
    setNewTodo("");
  };

  
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditValue(todo.task);
  };


  const saveEdit = async () => {
    if (editValue.trim() === "") {
      alert("Please enter a valid task!");
      return;
    }
  
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingTodo._id,  // ✅ Use _id
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
  };

  
  const markAsDone = async (_id, isdone, task) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id, task, isdone: !isdone }),
    });
  
    const updatedTodo = await res.json();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
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
  };

  return (
    <div>
      <h1>TodoList With Next.js</h1>

      <input
        placeholder="Add a task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <br />
      <br />
      <button onClick={addNewTask}>Add Task</button>

      <h1>___________________________</h1>
      <h2>Tasks Todo</h2>
      <div className="main">
  {todos.map((todo) => (
    <div key={todo._id} className="todo-item">  {/* ✅ Use _id as key */}
      <ul>
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
            <span
              style={{
                textDecoration: todo.isdone ? "line-through pink" : "none",
              }}
            >
              &hearts; &nbsp;{todo.task}
            </span>
          )}
          <div className="todo-actions">
            {!editingTodo || editingTodo._id !== todo._id ? (
              <button
                className="todo-button edit-button"
                onClick={() => editTodo(todo)}
              >
                Edit
              </button>
            ) : null}

            <button
              className="todo-button done-button"
              onClick={() => markAsDone(todo._id, todo.isdone, todo.task)}
            >
              {todo.isdone ? "Undo" : "Done"}
            </button>

            <button
              className="todo-button delete-button"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </ul>
    </div>
  ))}
</div>

 </div>
  );
}
