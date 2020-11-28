const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about');
const usernameInput = document.querySelector('input[name="username"]');
const aboutInput = document.querySelector('input[name="about"]');
editProfileButton.addEventListener('click', showPopup)
closePopupButton.addEventListener('click', closePopup)

function showPopup() {
  usernameInput.value = profileNameElement.textContent;
  aboutInput.value = profileAboutElement.textContent;
  popup.classList.remove('popup_disabled');
}

function closePopup() {
  popup.classList.add('popup_disabled');
}
