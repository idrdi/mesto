import './index.css';

import {
  initialCards
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

const validationConfig = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  animatedButtonClass: 'animated-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error'
};

const editProfileButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const addCardButton = document.querySelector('.profile__add-button');


const imagePopup = new PopupWithImage('.card-preview-popup');
imagePopup.setEventListeners();

function createCard(name, imageUrl) {
  const cardData = {
    name: name,
    link: imageUrl
  }

  const card = new Card('#card-template', cardData, (link, name) => imagePopup.open(link, name));

  return card.getElement();
}

var cardList = new Section({
  items: initialCards,
  renderer: item => createCard(item.name, item.link)
}, '.cards');

const addCardPopup = new PopupWithForm({
  onSubmit: (values) => {
    const cardElement = createCard(values.name, values.link);
    cardList.addItem(cardElement);
  }
}, '.add-card-popup');
addCardPopup.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, addCardPopup.getForm());
addCardFormValidator.enableValidation();

const editProfilePopup = new PopupWithForm({
  onSubmit: (values) => {
    profileNameElement.textContent = values.username;
    profileAboutElement.textContent = values.about;
  }
}, '.edit-profile-popup');
editProfilePopup.setEventListeners();

const editProfileForm = editProfilePopup.getForm();
const usernameInput = editProfileForm.querySelector('.popup__input_type_username');
const aboutInput = editProfileForm.querySelector('.popup__input_type_about');

function updateProfileDataOnEditForm() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
}

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();


editProfileButton.addEventListener('click', () => {
  updateProfileDataOnEditForm();
  editProfilePopup.open()
});

addCardButton.addEventListener('click', () => addCardPopup.open());

cardList.renderItems();

editProfileFormValidator.enableValidation();
