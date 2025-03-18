
let todos = [
    { task: "Coding", id: Date.now(), isdone: false },
  ];
  
 
  export function getTodos() {
    return todos;
  }
  
 
  export function addTodo(task) {
    const newTodo = { task, id: Date.now(), isdone: false };
    todos.push(newTodo);
    return newTodo;
  }
  
 
  export function updateTodo(id, task, isdone) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      if (task !== undefined) todo.task = task;
      if (isdone !== undefined) todo.isdone = isdone;
      return todo;
    }
    return null;
  }
  
  
  
  export function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
  }
  