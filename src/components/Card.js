export default class Card {
  constructor(data, {
    cardSelector,
    currentUserId,
    handleImageClick,
    handleRemoveButtonClick,
    handleLike,
    handleRemoveLike
  }) {
    this._cardSelector = cardSelector;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;

    this._handleImageClick = handleImageClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;

    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  getId() {
    return this._id;
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

    this._isLiked = this._likes.find(item => item._id === this._currentUserId);

    this._setRemoveButtonState(this._isOwned());
    this._setLikeButtonState(this._isLiked);
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

  _setLikeButtonState(isActive) {
    if (isActive) {
      this._likeButtonElement.classList.add('card__like-button_active');
    } else {
      this._likeButtonElement.classList.remove('card__like-button_active');
    }
  }

  _fillData() {
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._updateLikesCount(this._likes.length);
  }

  _updateLikesCount(count) {
    this._likesCount = count;
    this._likeCounterElement.textContent = this._likesCount;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleImageClick(this._link, this._name));
    this._likeButtonElement.addEventListener('click', this._handleLikeClick);
    this._removeButtonElement.addEventListener('click', () => this._handleRemoveButtonClick(this));
  }

  _handleLikeClick() {
    if (this._isLiked) {
      this._handleRemoveLike(this);
    } else {
      this._handleLike(this);
    }
  }

  like(likesCount) {
    this._setLikeButtonState(true);
    this._updateLikesCount(likesCount);
    this._isLiked = true;
  }

  removeLike(likesCount) {
    this._setLikeButtonState(false);
    this._updateLikesCount(likesCount);
    this._isLiked = false;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
