import React, { useReducer } from "react";
import { Todo } from "./models/model";

const initialState = {
  todo: "",
  todos: [],
}

type Action = {
  
}

const TodoListContext = React.createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    todoList: state.todoList,
    addTodoItem: (todoItemLabel) => {
      dispatch({ type: actions.ADD_TODO_ITEM, todoItemLabel });
    },
    removeTodoItem: (todoItemId) => {
      dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId });
    },
    markAsCompleted: (todoItemId) => {
      dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId });
    }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );

};

export default TodoReducer;
