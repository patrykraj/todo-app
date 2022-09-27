import React, { useRef } from "react";
import { Dispatch, actions } from "../context";

import "./styles.css";

interface Props {
  todo: string;
  setTodo: Dispatch;
  handleCreateTodo: (e: React.SyntheticEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleCreateTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      type: actions.Input,
      payload: e.target.value,
    });
  };

  return (
    <form
      className="input"
      onSubmit={(e: React.SyntheticEvent) => {
        handleCreateTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        className="input__box"
        type="input"
        placeholder="Enter task"
        onChange={inputHandler}
        value={todo}
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
