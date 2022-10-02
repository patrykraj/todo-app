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
  | {
      type: "DELETE";
      payload: {
        id: number;
        type: string;
      };
    }
  | {
      type: "DONE";
      payload: {
        id: number;
        type: string;
      };
    }
  | { type: "INPUT"; payload: string }
  | {
      type: "DRAG";
      payload: {
        arrayType: string;
        array: Todo[];
      };
    }
  | {
      type: "DRAGTOLIST";
      payload: {
        source: {
          sourceArr: Todo[];
          type: string;
        };
        destination: {
          destinationArr: Todo[];
          type: string;
        };
      };
    }
  | {
      type: "EDIT";
      payload: {
        id: number;
        editValue: string;
        type: string;
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
  Drag = "DRAG",
  DragToList = "DRAGTOLIST",
  Edit = "EDIT",
}

enum arrayTypes {
  todos = "todos",
  completedTodos = "completedTodos",
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.Add:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        input: initialState.input,
      };
    case actions.Delete:
      return {
        ...state,
        [action.payload.type]: state[
          action.payload.type as keyof typeof arrayTypes
        ].filter((item: Todo) => item.id !== action.payload.id),
      };
    case actions.Done:
      return {
        ...state,
        [action.payload.type]: state[
          action.payload.type as keyof typeof arrayTypes
        ].map((item: Todo) =>
          item.id === action.payload.id
            ? { ...item, isDone: !item.isDone }
            : item,
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
        [action.payload.type]: state[
          action.payload.type as keyof typeof arrayTypes
        ].map((item: Todo) =>
          item.id === action.payload.id
            ? { ...item, description: action.payload.editValue }
            : item,
        ),
      };
    case actions.Drag:
      return {
        ...state,
        [action.payload.arrayType]: action.payload.array,
      };
    case actions.DragToList:
      return {
        ...state,
        [action.payload.source.type]: action.payload.source.sourceArr,
        [action.payload.destination.type]:
          action.payload.destination.destinationArr,
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
