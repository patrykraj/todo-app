import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import { actions, Dispatch } from "../context";

import "./styles.css";

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: Dispatch;
}

const TodoList: React.FC<Props> = ({ todos, completedTodos, setTodos }) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let sourceArr;
    let destinationArr;

    if (source.droppableId === "todos") {
      sourceArr = [...todos];
      destinationArr = [...completedTodos];
    } else {
      sourceArr = [...completedTodos];
      destinationArr = [...todos];
    }

    const element = sourceArr.splice(source.index, 1)[0];

    if (source.droppableId === destination.droppableId) {
      sourceArr.splice(destination.index, 0, element);

      setTodos({
        type: actions.Drag,
        payload: {
          array: sourceArr,
          arrayType:
            source.droppableId === "todos" ? "todos" : "completedTodos",
        },
      });
      return;
    }

    destinationArr.splice(destination.index, 0, element);
    setTodos({
      type: actions.DragToList,
      payload: {
        source: {
          sourceArr,
          type: source.droppableId,
        },
        destination: {
          destinationArr,
          type: destination.droppableId,
        },
      },
    });
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid">
        <div className="grid-container">
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="todos active"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="grid-header">Active tasks</h2>
                {todos.map((item, dragIdx) => (
                  <SingleTodo
                    key={item.id}
                    id={item.id}
                    setTodos={setTodos}
                    isDone={item.isDone}
                    dragIdx={dragIdx}
                    todoState="todos"
                  >
                    {item.description}
                  </SingleTodo>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="grid-container">
          <Droppable droppableId="completedTodos">
            {(provided) => (
              <ul
                className="todos completed"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="grid-header">Completed tasks</h2>
                {completedTodos.map((item, dragIdx) => (
                  <SingleTodo
                    key={item.id}
                    id={item.id}
                    setTodos={setTodos}
                    isDone={item.isDone}
                    dragIdx={dragIdx}
                    todoState="completedTodos"
                  >
                    {item.description}
                  </SingleTodo>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
