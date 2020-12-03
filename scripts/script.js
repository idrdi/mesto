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
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.textContent = usernameInput.value;
  profileAboutElement.textContent = aboutInput.value;

  popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', formSubmitHandler);
