import React from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import useTodo, { actions } from "./context";

import "./App.css";

const App: React.FC = () => {
  const { state, dispatch } = useTodo();

  const handleCreateTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: actions.Add,
      payload: {
        id: new Date().getTime(),
        description: state.input,
        isDone: false,
      },
    });
  };

  return (
    <div className="App">
      <h1 className="heading">TASKIFY</h1>
      <InputField
        todo={state.input}
        setTodo={dispatch}
        handleCreateTodo={handleCreateTodo}
      />
      <TodoList
        todos={state.todos}
        completedTodos={state.completedTodos}
        setTodos={dispatch}
      />
    </div>
  );
};

export default App;
