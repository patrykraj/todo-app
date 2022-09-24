import React from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <ul className="todos">
      {todos.map((item) => (
        <SingleTodo
          key={item.id}
          id={item.id}
          setTodos={setTodos}
          isDone={item.isDone}
        >
          {item.description}
        </SingleTodo>
      ))}
    </ul>
  );
};

export default TodoList;
