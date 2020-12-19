function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    enableInputsValidation(form, submitButton, config);
    setButtonState(submitButton, form.checkValidity(), config)
  });
}

function enableInputsValidation(form, submitButton, config) {
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function validateInput(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    resetError(form, input, config);
  }
}

function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function resetError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.classList.add(config.animatedButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.classList.remove(config.animatedButtonClass);
    button.disabled = true;
  }
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
