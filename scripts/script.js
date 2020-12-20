const editProfileButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');

const editProfilePopup = document.querySelector('.edit-profile-popup');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');
const usernameInput = editProfilePopup.querySelector('.popup__input_type_username');
const aboutInput = editProfilePopup.querySelector('.popup__input_type_about');
const editProfileForm = editProfilePopup.querySelector('.popup__container_type_form');

const cardPreviewPopup = document.querySelector('.card-preview-popup');
const closeCardPreviewPopupButton = cardPreviewPopup.querySelector('.popup__close-button');
const cardPreviewImage = cardPreviewPopup.querySelector('.card-preview-popup__image');
const cardPreviewDescription = cardPreviewPopup.querySelector('.card-preview-popup__description');

const addCardButton = document.querySelector('.profile__add-button');

const addCardPopup = document.querySelector('.add-card-popup');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');
const submitAddCardPopupButton = addCardPopup.querySelector('.popup__submit-button');
const cardNameInput = addCardPopup.querySelector('.popup__input_type_name');
const cardLinkInput = addCardPopup.querySelector('.popup__input_type_link');
const addCardForm = addCardPopup.querySelector('.popup__container_type_form');

const cardTemplate = document.querySelector('#cardTemplate').content;
const cardsContainer = document.querySelector('.cards');

const popups = document.querySelectorAll('.popup');

const root = document.querySelector('.main');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function showEditProfilePopup() {
  updateProfileDataOnEditForm();
  showPopup(editProfilePopup);
}

function updateProfileDataOnEditForm() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = usernameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  closePopup(editProfilePopup);
}

function showCard(cardElement, cardImage) {
  cardPreviewImage.src = cardImage.src;
  cardPreviewImage.alt = cardImage.alt;

  const cardTitle = cardElement.querySelector('.card__title');
  cardPreviewDescription.textContent = cardTitle.textContent;

  showPopup(cardPreviewPopup);
}

function handleCardLikeButtonClick(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function handleCardRemoveButtonClick(evt) {
  const cardElement = evt.target.closest('.card');
  removeCard(cardElement);
}

function handleCardImageClick(evt) {
  const cardElement = evt.target.closest('.card');
  showCard(cardElement, evt.target);
}

function removeCard(cardElement) {
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.removeEventListener('click', handleCardImageClick);

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.removeEventListener('click', handleCardLikeButtonClick);

  const removeButton = cardElement.querySelector('.card__remove-button');
  removeButton.removeEventListener('click', handleCardRemoveButtonClick);

  cardElement.remove();
}

function createCard(name, imageUrl) {
  const result = cardTemplate.cloneNode(true);

  const cardTitle = result.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = result.querySelector('.card__image');
  cardImage.src = imageUrl;
  cardImage.alt = name;
  cardImage.addEventListener('click', handleCardImageClick);

  const likeButton = result.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleCardLikeButtonClick);

  const removeButton = result.querySelector('.card__remove-button');
  removeButton.addEventListener('click', handleCardRemoveButtonClick);

  return result;
}

function addCard(name, imageUrl) {
  const cardElement = createCard(name, imageUrl);

  cardsContainer.prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(cardNameInput.value, cardLinkInput.value);

  addCardForm.reset();

  disableSubmitButton(submitAddCardPopupButton);

  closePopup(addCardPopup);
}

function disableSubmitButton(button) {
  button.classList.add('popup__submit-button_disabled');
  button.classList.remove('animated-button');
  button.disabled = true;
}

function addInitialCards() {
  initialCards.forEach(cardInfo => addCard(cardInfo.name, cardInfo.link));
}

editProfileButton.addEventListener('click', showEditProfilePopup);
closeEditProfilePopupButton.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

closeCardPreviewPopupButton.addEventListener('click', () => closePopup(cardPreviewPopup));

addCardButton.addEventListener('click', () => showPopup(addCardPopup));
closeAddCardPopupButton.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target == popup) {
      closePopup(popup);
    }
  });
});


root.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
});

addInitialCards();

updateProfileDataOnEditForm();
