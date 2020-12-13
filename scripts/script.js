function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

let editProfileButton = document.querySelector('.profile__edit-button');
let profileNameElement = document.querySelector('.profile__name');
let profileAboutElement = document.querySelector('.profile__about');

let editProfilePopup = document.querySelector('.edit-profile-popup');
let closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
let usernameInput = editProfilePopup.querySelector('input[name="username"]');
let aboutInput = editProfilePopup.querySelector('input[name="about"]');
let editProfileForm = editProfilePopup.querySelector('form[name="edit-profile"]');

function showEditProfilePopup() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;

  showPopup(editProfilePopup);
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.textContent = usernameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(editProfilePopup);
}

editProfileButton.addEventListener('click', showEditProfilePopup);
closeEditProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsContainer = document.querySelector('.cards');

function addCard(name, imageUrl) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = imageUrl;

  cardsContainer.prepend(cardElement);
}

function addInitialCards() {
  initialCards.forEach(cardInfo => addCard(cardInfo.name, cardInfo.link));
}

addInitialCards();

let addCardButton = document.querySelector('.profile__add-button');

let addCardPopup = document.querySelector('.add-card-popup');
let closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
let cardNameInput = addCardPopup.querySelector('input[name="name"]');
let cardLinkInput = addCardPopup.querySelector('input[name="link"]');
let addCardForm = addCardPopup.querySelector('form[name="add-card"]');

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value);

  cardNameInput.value = '';
  cardLinkInput.value = '';

  closePopup(addCardPopup);
}

addCardButton.addEventListener('click', () => showPopup(addCardPopup));
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
