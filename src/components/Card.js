import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DataContext } from "../context/store";
import "../sass/Card.scss";

const Card = ({ id, item, index }) => {
  const { cardDelete, cardEdit } = useContext(DataContext);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.title);
  const handleChange = (e) => setText(e.target.value);
  const isEdit = () => {
    setEdit(true);
  };
  const closeInput = () => {
    cardEdit(id, item.id, index, text);
    setEdit(false);
  };
  const deleteCard = () => {
    cardDelete(id, item.id);
  };
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="card-list"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {edit ? (
            <form onSubmit={closeInput}>
              <input
                type="text"
                autofocus
                onBlur={closeInput}
                value={text}
                onChange={handleChange}
              />
            </form>
          ) : (
            <div className="card-list__text">
              <p onClick={isEdit}>{item.title}</p>
              <img src="assets/delete.png" onClick={deleteCard} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
