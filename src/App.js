import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import Header from "./components/Header";
import { useContext } from "react";
import { DataContext } from "./context/store";
import Board from "./components/Board";
import Button from "./components/Button";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const App = () => {
  const { store, updateDrag } = useContext(DataContext);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (type == "list") return;
    {
      const lists = store.listIds;
      lists.splice(source.index, 1);
      lists.splice(destination.index, 0, draggableId);
      const newStore = {
        ...store,
        listIds: lists,
      };
      updateDrag(newStore);
      // return;
    }
    const sourceList = store.lists[source.droppableId];
    const destinationList = store.lists[destination.droppableId];
    const draggingCard = sourceList.cards.find(
      (item) => item.id === draggableId
    );
    if (sourceList === destinationList) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newStore = {
        ...store,
        lists: {
          ...store.lists,
          [sourceList.id]: destinationList,
        },
      };
      updateDrag(newStore);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="app" type="list" direction="horizontal">
        {(provided) => (
          <div
            className="App"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Header />
            <div className="container">
              {store.listIds.map((id, index) => {
                const data = store.lists[id];
                return <Board key={id} data={data} index={index} />;
              })}
              <Button list />
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;

{
  /* <h1>LEARNING SCSS</h1>
<div className="card">
  <div className="card__image">image</div>
  <div className="card__heading">heading</div>
  <div className="card__paragraph--normal">paragraph normal</div>
  <div className="card__paragraph--italic ">paragraph italic</div>
</div>
<button className="btn btn--primary">Button</button>
<button className="btn btn--secondary">Button</button> */
}
