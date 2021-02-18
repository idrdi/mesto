import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleSubmit
  }) {
    super(popupSelector);

    this.handleSubmit = handleSubmit;

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

    this.handleSubmit(this._getInputValues());
  }

  close() {
    this._form.reset();

    super.close();
  }
}
