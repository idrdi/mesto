export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1",
  groupId: "cohort-20",
  headers: {
    authorization: "d0fcb19b-6273-4c68-b52a-ee086491a70a"
  }
};

export const validationConfig = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  animatedButtonClass: 'animated-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error'
};

export const editProfileButton = document.querySelector('.profile__edit-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');
export const addCardButton = document.querySelector('.profile__add-button');
