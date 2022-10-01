import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { Dispatch, actions } from "../context";
import EditField from "./EditField";

import "./styles.css";

type Props = {
  children: string;
  id: number;
  setTodos: Dispatch;
  isDone: boolean;
  dragIdx: number;
};

const SingleTodo: React.FC<Props> = ({
  children,
  id,
  isDone,
  setTodos,
  dragIdx,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = () => {
    setTodos({
      type: actions.Delete,
      payload: id,
    });
  };

  const handleIsDone = () => {
    setTodos({
      type: actions.Done,
      payload: id,
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <Draggable draggableId={id.toString()} index={dragIdx}>
      {(provided) => (
        <li
          className={`list-element ${isDone ? "done" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="list-element__text">
            {editMode ? (
              <EditField
                inputRef={inputRef}
                defaultValue={children}
                setEditMode={setEditMode}
                setTodos={setTodos}
                id={id}
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
