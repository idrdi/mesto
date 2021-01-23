import FormValidator from './FormValidator.js';

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
  });
}

const validationConfig = {
  formSelector: '.popup__container_type_form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  animatedButtonClass: 'animated-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__error'
};

enableValidation(validationConfig);
