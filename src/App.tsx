import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCreateTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { id: new Date().getTime(), description: todo, isDone: false },
    ]);
    setTodo("");
  };

  return (
    <div className="App">
      <h1 className="heading">TASKIFY</h1>
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleCreateTodo={handleCreateTodo}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
