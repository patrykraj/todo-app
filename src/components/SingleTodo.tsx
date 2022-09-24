import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/model";
import "./styles.css";

type Props = {
  children: string;
  id: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isDone: boolean;
};

const SingleTodo: React.FC<Props> = ({ children, id, isDone, setTodos }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = () => {
    setTodos((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleIsDone = () => {
    setTodos((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <li className={`list-element ${isDone ? "done" : ""}`}>
      <span className="list-element__text">
        {editMode ? (
          <input
            ref={inputRef}
            className="list-element__input"
            type="text"
            defaultValue={children}
          />
        ) : (
          children
        )}
      </span>
      <div>
        {!isDone && (
          <span
            className="list-element__icon"
            tabIndex={0}
            role="button"
            onClick={() => setEditMode(!editMode)}
            onKeyDown={() => setEditMode(!editMode)}
          >
            <AiFillEdit />
          </span>
        )}
        <span
          className="list-element__icon"
          tabIndex={0}
          role="button"
          onClick={handleDeleteTodo}
          onKeyDown={handleDeleteTodo}
        >
          <AiFillDelete />
        </span>
        <span
          className="list-element__icon"
          tabIndex={0}
          role="button"
          onClick={handleIsDone}
          onKeyDown={handleIsDone}
        >
          <MdDone />
        </span>
      </div>
    </li>
  );
};

export default SingleTodo;
