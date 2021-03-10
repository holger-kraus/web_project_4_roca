import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitButtonLoadingText, handleFormSubmission) {
    super(popupSelector);
    this._handleFormSubmission = handleFormSubmission;
    this._form = this._popup.querySelector(".form");
    console.log(this._form);

    this._submitButton = this._popup.querySelector(".form__save");
    this._submitButtonText = this._submitButton.textContent;
    this._submitButtonLoadingText = submitButtonLoadingText;

  }

  _getInputValues() {
    const formElements = Array.from(this._form.elements);
    return formElements.map((element) => element.value);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent =  this._submitButtonLoadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmission(this._getInputValues(), () => {
        this.renderLoading(false);
        this.close();
      });
    });
    this._form.addEventListener("click", (event) => event.stopPropagation());
  }

  open(initValues) {
    const formElements = Array.from(this._form.elements);
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].value = initValues[i];
      formElements[i].dispatchEvent(new Event("input"));
    }
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
