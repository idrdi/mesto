export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._setEventListeners();
    this._setSubmitButtonState(this._form.checkValidity())
  }

  _setEventListeners() {
    const inputs = this._form.querySelectorAll(this._config.inputSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._setSubmitButtonState(this._form.checkValidity());
      });
    });
  }

  _validateInput(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._resetError(input);
    }
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _resetError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _setSubmitButtonState(isActive) {
    const button = this._submitButton;
    const config = this._config;
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
}
