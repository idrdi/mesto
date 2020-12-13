function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

const editProfileButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');

const editProfilePopup = document.querySelector('.edit-profile-popup');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
const usernameInput = editProfilePopup.querySelector('input[name="username"]');
const aboutInput = editProfilePopup.querySelector('input[name="about"]');
const editProfileForm = editProfilePopup.querySelector('form[name="edit-profile"]');

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

const cardPreviewPopup = document.querySelector('.card-preview-popup');
const closeCardPreviewPopupButton = cardPreviewPopup.querySelector('.popup__close-button');

function showCard(cardElement) {
  const cardImage = cardElement.querySelector('.card__image');
  const popupImage = cardPreviewPopup.querySelector('.card-preview-popup__image');
  popupImage.src = cardImage.src;

  const cardTitle = cardElement.querySelector('.card__title');
  const popupDescription = cardPreviewPopup.querySelector('.card-preview-popup__description');
  popupDescription.textContent = cardTitle.textContent;

  showPopup(cardPreviewPopup);
}

closeCardPreviewPopupButton.addEventListener('click', () => closePopup(cardPreviewPopup));

const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsContainer = document.querySelector('.cards');

function likeButtonClickHandler(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function removeButtonClickHandler(evt) {
  const cardElement = evt.target.closest('.card');
  removeCard(cardElement);
}

function imageClickHandler(evt) {
  const cardElement = evt.target.closest('.card');
  showCard(cardElement);
}

function removeCard(cardElement) {
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.removeEventListener('click', imageClickHandler);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.removeEventListener('click', likeButtonClickHandler);

  const removeButton = cardElement.querySelector('.card__remove-button');
  removeButton.removeEventListener('click', removeButtonClickHandler);

  cardElement.remove();
}

function addCard(name, imageUrl) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = imageUrl;
  cardImage.addEventListener('click', imageClickHandler);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeButtonClickHandler);

  const removeButton = cardElement.querySelector('.card__remove-button');
  removeButton.addEventListener('click', removeButtonClickHandler);

  cardsContainer.prepend(cardElement);
}

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = document.querySelector('.add-card-popup');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const cardNameInput = addCardPopup.querySelector('input[name="name"]');
const cardLinkInput = addCardPopup.querySelector('input[name="link"]');
const addCardForm = addCardPopup.querySelector('form[name="add-card"]');

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

function addInitialCards() {
  initialCards.forEach(cardInfo => addCard(cardInfo.name, cardInfo.link));
}

addInitialCards();
