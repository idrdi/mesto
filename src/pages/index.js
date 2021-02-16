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

function createCard(name, imageUrl) {
  const cardData = {
    name: name,
    link: imageUrl
  }

  const card = new Card('#card-template', cardData, (link, name) => imagePopup.open(link, name));

  return card.getElement();
}

// Initialize add card popup

const cardList = new Section({
  renderer: item => createCard(item.name, item.link)
}, '.cards');

const addCardPopup = new PopupWithForm({
  onSubmit: (values) => {
    const cardElement = createCard(values.name, values.link);
    cardList.addItem(cardElement);
    addCardPopup.close();
  }
}, '.add-card-popup');

addCardPopup.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, addCardPopup.getForm());
addCardFormValidator.enableValidation();

addCardButton.addEventListener('click', () => {
  addCardFormValidator.reset();
  addCardPopup.open();
});

// Initialize edit profile popup
const editProfilePopup = new PopupWithForm({
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
}, '.edit-profile-popup');

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
  .then(data => cardList.renderItems(data))
  .catch(console.log);
