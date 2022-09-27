import type { ReactNode } from "react";
import React, { createContext, useReducer, useContext } from "react";
import { Todo } from "../models/model";

const initialState = {
  input: "",
  todos: [],
  completedTodos: [],
};

export type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "DELETE"; payload: number }
  | { type: "DONE"; payload: number }
  | { type: "INPUT"; payload: string }
  | {
      type: "EDIT";
      payload: {
        id: number;
        editValue: string;
      };
    };
export type Dispatch = (action: Action) => void;
export type State = typeof initialState;

const TodoContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export enum actions {
  Add = "ADD",
  Delete = "DELETE",
  Done = "DONE",
  Input = "INPUT",
  Edit = "EDIT",
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.Add:
      return { ...state, todos: [...state.todos, action.payload], input: "" };
    case actions.Delete:
      return {
        ...state,
        todos: state.todos.filter((item: Todo) => item.id !== action.payload),
      };
    case actions.Done:
      return {
        ...state,
        todos: state.todos.map((item: Todo) =>
          item.id === action.payload ? { ...item, isDone: !item.isDone } : item,
        ),
      };
    case actions.Input:
      return {
        ...state,
        input: action.payload,
      };
    case actions.Edit:
      return {
        ...state,
        todos: state.todos.map((item: Todo) =>
          item.id === action.payload.id
            ? { ...item, description: action.payload.editValue }
            : item,
        ),
      };
    default:
      throw new Error();
  }
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer as any,
    initialState,
  );

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

function useTodo() {
  const context = useContext(TodoContext);

  if (!context) throw new Error("useTodo must be used inside a TodoProvider");

  return context;
}

export default useTodo;
