import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  // Снимаем слушатель, чтобы девктивировать вызов функции при нажатии на 'Esc', если модальное окно не открыто:
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  //Закрытие модального окна при нажатии 'Esc':
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  //Закрытие модального окна при клике на темное поле:
  handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
