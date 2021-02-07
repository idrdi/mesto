import './index.css';

import {
  initialCards
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

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

const editProfilePopup = document.querySelector('.edit-profile-popup');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
const usernameInput = editProfilePopup.querySelector('.popup__input_type_username');
const aboutInput = editProfilePopup.querySelector('.popup__input_type_about');
const editProfileForm = editProfilePopup.querySelector('.popup__container_type_form');
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);

const cardPreviewPopup = document.querySelector('.card-preview-popup');
const closeCardPreviewPopupButton = cardPreviewPopup.querySelector('.popup__close-button');
const cardPreviewImage = cardPreviewPopup.querySelector('.card-preview-popup__image');
const cardPreviewDescription = cardPreviewPopup.querySelector('.card-preview-popup__description');

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = document.querySelector('.add-card-popup');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const cardNameInput = addCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = addCardPopup.querySelector('.popup__input_type_link');
const addCardForm = addCardPopup.querySelector('.popup__container_type_form');
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

const cardsContainer = document.querySelector('.cards');

const root = document.querySelector('.main');


function handleKeyDown(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

function handlePopupClick(evt) {
  closePopup(evt.target);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handlePopupClick);
  root.removeEventListener('keydown', handleKeyDown);
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handlePopupClick);
  root.addEventListener('keydown', handleKeyDown);
}

function showEditProfilePopup() {
  updateProfileDataOnEditForm();
  editProfileFormValidator.reset();
  showPopup(editProfilePopup);
}

function updateProfileDataOnEditForm() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
}

function showAddCardPopup() {
  addCardFormValidator.reset();
  showPopup(addCardPopup);
}

function handleEditProfileFormSubmit() {
  profileNameElement.textContent = usernameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(editProfilePopup);
}

function openImagePopup(link, name) {
  cardPreviewImage.src = link;
  cardPreviewImage.alt = name;

  cardPreviewDescription.textContent = name;

  showPopup(cardPreviewPopup);
}

function createCard(name, imageUrl) {
  const cardData = {
    name: name,
    link: imageUrl
  }

  const card = new Card('#card-template', cardData, openImagePopup);

  return card.getElement();
}

var cardList = new Section({
  items: initialCards,
  renderer: item => {
    const cardElement = createCard(item.name, item.link);
    cardList.addItem(cardElement);
  }
}, '.cards');

function handleAddCardFormSubmit() {
  const cardElement = createCard(cardNameInput.value, cardLinkInput.value);
  cardList.addItem(cardElement);

  addCardForm.reset();

  closePopup(addCardPopup);
}

editProfileButton.addEventListener('click', showEditProfilePopup);
closeEditProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

closeCardPreviewPopupButton.addEventListener('click', () => closePopup(cardPreviewPopup));

addCardButton.addEventListener('click', showAddCardPopup);
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

cardList.renderItems();

updateProfileDataOnEditForm();

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
