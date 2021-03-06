import './index.css';

import {
  apiConfig,
  validationConfig,
  editProfileButton,
  editAvatarButton,
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
  removeCardPopup.handleSubmit = () => {
    removeCardPopup.getSubmitButton().textContent = 'Удаление...'

    api.removeCard(card.getId())
      .then(() => {
        card.remove();
        removeCardPopup.close();
        removeCardPopup.handleSubmit = null;
      })
      .catch(console.log)
      .finally(() => removeCardPopup.getSubmitButton().textContent = 'Да');
  }

  removeCardPopup.open();
}

function handleLike(card) {
  api.likeCard(card.getId())
    .then((data) => {
      card.like(data.likes.length);
    })
    .catch(console.log);
}

function handleRemoveLike(card) {
  api.removeLike(card.getId())
    .then((data) => {
      card.removeLike(data.likes.length);
    })
    .catch(console.log);
}

function createCard(data) {
  const card = new Card(data, {
    cardSelector: '#card-template',
    currentUserId: userInfo.getUserId(),
    handleImageClick: (link, name) => imagePopup.open(link, name),
    handleRemoveButtonClick: handleRemoveCardButtonClick,
    handleLike: handleLike,
    handleRemoveLike: handleRemoveLike
  });

  return card.getElement();
}

// Initialize add card popup

const cardList = new Section({
  renderer: item => createCard(item)
}, '.cards');

const addCardPopup = new PopupWithForm({
  popupSelector: '.add-card-popup',
  handleSubmit: (values) => {
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

// Initialize edit avatar popup
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.edit-avatar-popup',
  handleSubmit: (values) => {
    editAvatarPopup.getSubmitButton().textContent = 'Сохранение...'
    api.updateAvatar({
        avatar: values.link
      })
      .then(data => {
        userInfo.setUserInfo(data);
        editAvatarPopup.close();
      })
      .catch(console.log)
      .finally(() => editAvatarPopup.getSubmitButton().textContent = 'Сохранить');
  }
});
editAvatarPopup.setEventListeners();

const editAvatarForm = editAvatarPopup.getForm();
const editAvatarFormValidator = new FormValidator(validationConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();

// Initialize edit profile popup
const editProfilePopup = new PopupWithForm({
  popupSelector: '.edit-profile-popup',
  handleSubmit: (values) => {
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


Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {
    userInfo.setUserInfo(profile);

    cardList.renderItems(cards.reverse());

    addCardButton.addEventListener('click', () => {
      addCardFormValidator.reset();
      addCardPopup.open();
    });

    editAvatarButton.addEventListener('click', () => {
      editAvatarFormValidator.reset();
      editAvatarPopup.open();
    });

    editProfileButton.addEventListener('click', () => {
      updateProfileDataOnEditForm();
      editProfileFormValidator.reset();
      editProfilePopup.open();
    });
  })
  .catch(console.log);
