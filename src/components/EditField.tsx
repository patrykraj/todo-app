import React, { useState } from "react";
import { Dispatch, actions } from "../context";

interface EditFieldTypes {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement> | null;
  defaultValue: string;
  setTodos: Dispatch;
  id: number;
}

const EditField = ({
  inputRef,
  defaultValue,
  setEditMode,
  setTodos,
  id,
}: EditFieldTypes) => {
  const [editValue, setEditValue] = useState<string>(defaultValue);

  const handleEditSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTodos({
      type: actions.Edit,
      payload: {
        id,
        editValue,
      },
    });
    setEditMode(false);
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <input
        ref={inputRef}
        className="list-element__input"
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
    </form>
  );
};

export default EditField;
