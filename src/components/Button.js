import React, { useContext, useState } from "react";
import { DataContext } from "../context/store";
import "../sass/Button.scss";
// import Textarea from "react-textarea-autosize";

const Button = ({ id, list }) => {
  const { cardAdd, listAdd } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const closeForm = () => {
    setOpen(false);
  };
  const openForm = () => {
    setOpen(true);
  };
  const handleChange = (e) => setText(e.target.value);
  const addCard = () => {
    if (text) {
      cardAdd(id, text);
    }
    setText("");
  };
  const addList = () => {
    if (text) {
      listAdd(text);
    }
    setText("");
  };
  const showForm = () => {
    const textButton = list ? "add list" : "add card";
    const placeHolder = list ? "enter list title" : "enter card title";
    return (
      <div className="form-box">
        <textarea
          className="text-area"
          onBlur={closeForm}
          value={text}
          placeholder={placeHolder}
          autoFocus
          onChange={handleChange}
        ></textarea>
        <button className="add" onMouseDown={list ? addList : addCard}>
          {textButton}
        </button>
        <button className="close">
          <img src="assets/close.png" onClick={closeForm} />
        </button>
      </div>
    );
  };
  const showButton = () => {
    const textButton = list ? "add another button" : "add a new card";
    const opacityButton = list ? 1 : 0.5;
    const colorButton = list ? "white" : "inherit";
    const backgroundButton = list ? "rgba(0,0,0,.25" : "inherit";
    return (
      <div
        onClick={() => setOpen(true)}
        className="add-button"
        style={{
          opacity: opacityButton,
          color: colorButton,
          background: backgroundButton,
        }}
      >
        + {textButton}
      </div>
    );
  };

  return open ? showForm() : showButton();
};

export default Button;
