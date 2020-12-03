let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileNameElement = document.querySelector('.profile__name');
let profileAboutElement = document.querySelector('.profile__about');
let usernameInput = document.querySelector('input[name="username"]');
let aboutInput = document.querySelector('input[name="about"]');
let editProfileForm = document.querySelector('form[name="edit-profile"]');

function showPopup() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  popup.classList.remove('popup_disabled');
}

function closePopup() {
  popup.classList.add('popup_disabled');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.textContent = usernameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  popup.classList.add('popup_disabled');
}

editProfileButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
