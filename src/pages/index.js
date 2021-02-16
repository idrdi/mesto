import './index.css';

import {
  apiConfig,
  validationConfig,
  editProfileButton,
  addCardButton
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

const api = new Api(apiConfig);

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage('.card-preview-popup');
imagePopup.setEventListeners();

const removeCardPopup = new PopupWithForm({
  popupSelector: '.remove-card-popup'
});
removeCardPopup.setEventListeners();

function handleRemoveCardButtonClick(card) {
  removeCardPopup.onSubmit = () => {
    card.remove();
    removeCardPopup.close();
    removeCardPopup.onSubmit = null;
  }
  removeCardPopup.open();
}

function createCard(data) {
  const card = new Card(data, {
    cardSelector: '#card-template',
    onImageClick: (link, name) => imagePopup.open(link, name),
    onRemoveButtonClick: () => handleRemoveCardButtonClick(card)
  });

  return card.getElement();
}

// Initialize add card popup

const cardList = new Section({
  renderer: item => createCard(item)
}, '.cards');

const addCardPopup = new PopupWithForm({
  popupSelector: '.add-card-popup',
  onSubmit: (values) => {
    addCardPopup.getSubmitButton().textContent = 'Создание...'
    api.addCard(values)
      .then(data => {
        const cardElement = createCard(data);
        cardList.addItem(cardElement);
        addCardPopup.close();
      })
      .catch(console.log)
      .finally(() => addCardPopup.getSubmitButton().textContent = 'Создать');
  }
});

addCardPopup.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, addCardPopup.getForm());
addCardFormValidator.enableValidation();

addCardButton.addEventListener('click', () => {
  addCardFormValidator.reset();
  addCardPopup.open();
});

// Initialize edit profile popup
const editProfilePopup = new PopupWithForm({
  popupSelector: '.edit-profile-popup',
  onSubmit: (values) => {
    editProfilePopup.getSubmitButton().textContent = 'Сохранение...'
    api.updateProfile({
        name: values.username,
        about: values.about
      })
      .then(data => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch(console.log)
      .finally(() => editProfilePopup.getSubmitButton().textContent = 'Сохранить');
  }
});

editProfilePopup.setEventListeners();

const editProfileForm = editProfilePopup.getForm();
const usernameInput = editProfileForm.querySelector('.popup__input_type_username');
const aboutInput = editProfileForm.querySelector('.popup__input_type_about');

function updateProfileDataOnEditForm() {
  const user = userInfo.getUserInfo();
  usernameInput.value = user.name;
  aboutInput.value = user.about;
}

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
  updateProfileDataOnEditForm();
  editProfileFormValidator.reset();
  editProfilePopup.open();
});

//Load user info
api.getProfile()
  .then(data => userInfo.setUserInfo(data))
  .catch(console.log)

//Render initial cards
api.getCards()
  .then(data => cardList.renderItems(data.reverse()))
  .catch(console.log);
