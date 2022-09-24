import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleCreateTodo: (e: React.SyntheticEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleCreateTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
