export default class Card {
  constructor(cardSelector, data, onImageClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this.onImageClick = onImageClick;
  }

  getElement() {
    if (!this._element) {
      this._initializeElement();
    }
    return this._element;
  }

  _initializeElement() {
    const element = this._getTemplate();

    this._element = element;
    this._titleElement = element.querySelector('.card__title');
    this._imageElement = element.querySelector('.card__image');
    this._likeButtonElement = element.querySelector('.card__like-button');
    this._removeButtonElement = element.querySelector('.card__remove-button');

    this._fillData();
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _fillData() {
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', this._handleImageClick);
    this._likeButtonElement.addEventListener('click', this._handleLikeClick);
    this._removeButtonElement.addEventListener('click', this._handleRemoveButtonClick);
  }

  _handleImageClick = () => {
    this.onImageClick(this._link, this._name);
  }

  _handleLikeClick = () => {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _handleRemoveButtonClick = () => {
    this._element.remove();
    this._element = null;
  }
}
