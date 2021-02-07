import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.card-preview-popup__image');
    this._desctiption = this._popup.querySelector('.card-preview-popup__description');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;

    this._desctiption.textContent = name;
    super.open();
  }
}
