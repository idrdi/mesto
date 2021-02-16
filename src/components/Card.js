export default class Card {
  constructor(data, {
    cardSelector,
    currentUserId,
    api,
    onImageClick,
    onRemoveButtonClick
  }) {
    this._cardSelector = cardSelector;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._api = api;
    this._currentUserId = currentUserId;
    this._onImageClick = onImageClick;
    this._onRemoveButtonClick = onRemoveButtonClick;

    this._handleImageClick = this._handleImageClick.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
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
    this._likeCounterElement = element.querySelector('.card__like-counter');
    this._removeButtonElement = element.querySelector('.card__remove-button');

    this._setRemoveButtonState(this._isOwned());
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

  _isOwned() {
    return this._currentUserId == this._ownerId;
  }

  _setRemoveButtonState(isVisible) {
    if (isVisible) {
      this._removeButtonElement.classList.add('card__remove-button_visible');
    } else {
      this._removeButtonElement.classList.remove('card__remove-button_visible');
    }
  }

  _fillData() {
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeCounterElement.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', this._handleImageClick);
    this._likeButtonElement.addEventListener('click', this._handleLikeClick);
    this._removeButtonElement.addEventListener('click', this._onRemoveButtonClick);
  }

  _handleImageClick() {
    this._onImageClick(this._link, this._name);
  }

  _handleLikeClick() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  remove() {
    if (!this._isOwned()) {
      return;
    }

    this._api.removeCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch(console.log);
  }
}
