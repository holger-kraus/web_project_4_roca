import api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

class AddPlace extends HTMLElement {

  // validation settings
  validationSettings = {
    formSelector: ".form",
    inputSelector: ".form__field",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_inactive",
    inputErrorClass: "form__field_error",
    errorClass: "form__field-error_active"
  }

  htmlToElement(html) {
    const domParser = new DOMParser();
    return domParser.parseFromString(html,'text/html');
  }

  // // overlay place elements
  // _addCard(cardId, title, link, likedByList, ownerId) {
  //   const handleCardClick = (imageTitle, imageLink) => {
  //     imagePopup.open(imageTitle, imageLink);
  //   };
  //   const handleRemoveCard = (card) => {
  //     confirmationFormPopup.open([card]);
  //   }
  //   const newCard = new Card(cardId, userInfo.userId, ownerId, title, link, likedByList, "#element__template", handleCardClick, handleRemoveCard, handleLike, handleDislike).generateCard();
  //   cardList.setItem(newCard);
  // }

  _handlePlaceSubmit([name, link], finalAction) {
    api.addCard(name, link)
      .then((card) => {
        console.log(card);
        const likedByList = card.likes.map((like) => like._id);
        const ownerId = card.owner._id;
        //addCard(card._id, card.name, card.link, likedByList, ownerId);
      }).catch((err) => {
      console.log(err);
    }).finally(finalAction);
  }

  connectedCallback() {
    console.log(this.localName, this)
    let link = this.querySelector('a');
    let body = document.querySelector('body');
    link.addEventListener("click", (event) => {
      event.preventDefault();
      fetch(link.href).then((result) => {
        result.text().then((resultPage) => {
          let domElements = this.htmlToElement(resultPage);
          let overlay = domElements.querySelector(".overlay");
          body.append(overlay);
          const placeFormPopup = new PopupWithForm(".overlay_place", "Saving...", this._handlePlaceSubmit);
          placeFormPopup.setEventListeners();
          const placeOverlayContainer = document.querySelector(".overlay__container_place");
          const placeForm = placeOverlayContainer.querySelector(".form");
          new FormValidator(placeForm, this.validationSettings).enableValidation();
        })
      })
    });
  }
}

customElements.define("add-place", AddPlace);






