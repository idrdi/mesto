import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({
    onSubmit
  }, popupSelector) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._form = this._popup.querySelector('.popup__container_type_form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  getForm() {
    return this._form;
  }

  getSubmitButton() {
    return this._submitButton;
  }

  _getInputValues() {
    const result = {};

    this._inputs.forEach(input => {
      result[input.name] = input.value;
    });

    return result;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleFormSubmit)
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    this._onSubmit(this._getInputValues());
  }

  close() {
    this._form.reset();

    super.close();
  }
}
