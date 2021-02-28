import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    "Authorization": "cf0daf24-499f-4e4d-a691-bc6825f65b5e",
    "Content-Type": "application/json"
  }
});

// validation settings
const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive",
  inputErrorClass: "form__field_error",
  errorClass: "form__field-error_active"
}

// overlay image elements
const imagePopup = new PopupWithImage(".overlay_image");
imagePopup.setEventListeners();

// create section
const cardList = new Section({
  items: [], renderer: () => {
  }
}, ".elements__list");

// profile elements
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const profileAvatarButton = profile.querySelector(".profile__avatar");
const userInfo = new UserInfo(".profile__name", ".profile__about-me", ".profile__avatar-image");

// overlay profile description
const handleProfileSubmit = ([name, about], finalAction) => {
  api.updateProfile(name, about)
    .then((updatedProfile) => {
      userInfo.setUserInfo(updatedProfile.name, updatedProfile.about);
    }).catch((err) => {
    console.log(err);
  }).finally(finalAction);
};
const profileFormPopup = new PopupWithForm(".overlay_profile", "Saving...", handleProfileSubmit);
profileFormPopup.setEventListeners();

const profileOverlayContainer = document.querySelector(".overlay__container_profile");
const profileForm = profileOverlayContainer.querySelector(".form");
new FormValidator(profileForm, validationSettings).enableValidation();

// overlay profile avatar
const handleProfileAvatarSubmit = ([link], finalAction) => {
  api.updateProfilePicture(link)
    .then((updatedProfile) => {
      userInfo.setAvatar(updatedProfile.avatar);
    }).catch((err) => {
    console.log(err);
  }).finally(finalAction);
};
const profileAvatarFormPopup = new PopupWithForm(".overlay_avatarpic", "Saving...", handleProfileAvatarSubmit);
profileAvatarFormPopup.setEventListeners();

const profileAvatarContainer = document.querySelector(".overlay__container_avatarpic");
const profileAvatarForm = profileAvatarContainer.querySelector(".form");
new FormValidator(profileAvatarForm, validationSettings).enableValidation();

const deleteCard = ([cardId], finalAction) => {
  api.deleteCard(cardId)
    .then(() => {
      cardList.removeItem(cardId)
    }).catch((err) => {
    console.log(err);
  }).finally(() => {
      finalAction();
    }
  );
}
const confirmationFormPopup = new PopupWithForm(".overlay_confirmation", "Deleting...", deleteCard);
confirmationFormPopup.setEventListeners();

const handleLike = (cardId, card) => {
  api.addLike(cardId).then((updatedCard) => {
    const likedByList = updatedCard.likes.map((like) => like._id);
    card.addLike(likedByList);
  })
    .catch((err) => {
      console.log(err);
    });
}

const handleDislike = (cardId, card) => {
  api.deleteLike(cardId).then((updatedCard) => {
    const likedByList = updatedCard.likes.map((like) => like._id);
    card.removeLike(likedByList);
  })
    .catch((err) => {
      console.log(err);
    });
}

// overlay place elements
const addCard = (cardId, title, link, likedByList, ownerId) => {
  const handleCardClick = (imageTitle, imageLink) => {
    imagePopup.open(imageTitle, imageLink);
  };
  const handleRemoveCard = (card) => {
    confirmationFormPopup.open([card]);
  }
  const newCard = new Card(cardId, userInfo.userId, ownerId, title, link, likedByList, "#element__template", handleCardClick, handleRemoveCard, handleLike, handleDislike).generateCard();
  cardList.setItem(newCard);
};

const handlePlaceSubmit = ([name, link], finalAction) => {
  api.addCard(name, link)
    .then((card) => {
      const likedByList = card.likes.map((like) => like._id);
      const ownerId = card.owner._id;
      addCard(card._id, card.name, card.link, likedByList, ownerId);
    }).catch((err) => {
    console.log(err);
  }).finally(finalAction);
}
const placeFormPopup = new PopupWithForm(".overlay_place", "Saving...", handlePlaceSubmit);
placeFormPopup.setEventListeners();

const placeOverlayContainer = document.querySelector(".overlay__container_place");
const placeForm = placeOverlayContainer.querySelector(".form");
new FormValidator(placeForm, validationSettings).enableValidation();

// register open form listeners
editButton.addEventListener("click", () => {
  const {name, aboutMe} = userInfo.getUserInfo();
  profileFormPopup.open([name, aboutMe]);
});

addButton.addEventListener("click", () => {
  placeFormPopup.open([null, null]);
});

profileAvatarButton.addEventListener("click", () => {
  profileAvatarFormPopup.open(["", ""])
})

// load profile and intial cards in parallel to increase speed
// but also assuring that we have the profile id when we create the cards
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([currentProfile, cards]) => {
      userInfo.setUserInfo(currentProfile.name, currentProfile.about);
      userInfo.setAvatar(currentProfile.avatar);
      userInfo.setUserId(currentProfile._id);

      cards.forEach((card) => {
        const likedByList = card.likes.map((like) => like._id);
        const ownerId = card.owner._id;
        addCard(card._id, card.name, card.link, likedByList, ownerId);
      });
    }
  ).catch((err) => {
  console.log(err);
});


