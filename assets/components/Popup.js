export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
     this.close();
     event.stopPropagation();
    }
  }

  open() {
    this._popup.classList.add("overlay_opened");
  }

  close() {
    this._popup.classList.remove("overlay_opened");
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      this.close();
      event.stopPropagation();
    });

    const closeButton = this._popup.querySelector(".overlay__close-button");
    closeButton.addEventListener("click", (event) => {
      this.close();
      event.stopPropagation();
    });

    this._popup.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }
}
