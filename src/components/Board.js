import React from "react";
import BoardTitle from "./BoardTitle";
import "../sass/Board.scss";
import Card from "./Card";
import Button from "./Button";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Board = ({ id, data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="board"
        >
          <div className="board__title">
            <BoardTitle title={data.title} id={data.id} />
            <div className="menu">
              <img src="assets/menu.png" alt="meme" />
            </div>
          </div>

          {/* <h3>{data.title}</h3> */}
          <Droppable droppableId={data.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.cards.map((card, index) => (
                  <Card key={card.id} id={data.id} item={card} index={index} />
                ))}
                {provided.placeholder}
                <Button id={data.id} />
              </div>
            )}
          </Droppable>
          <button>Add</button>
        </div>
      )}
    </Draggable>
  );
};

export default Board;
