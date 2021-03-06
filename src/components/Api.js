export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._groupId = options.groupId;
  }

  getProfile() {
    return fetch(`${this._getUsersUrl()}/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  updateProfile(data) {
    return fetch(`${this._getUsersUrl()}/me`, {
      method: 'PATCH',
      headers: Object.assign(this._headers, {
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._getUsersUrl()}/me/avatar`, {
      method: 'PATCH',
      headers: Object.assign(this._headers, {
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(this._getCardsUrl(), {
      headers: this._headers
    }).then(this._handleResponse);
  }

  addCard(data) {
    return fetch(this._getCardsUrl(), {
      method: 'POST',
      headers: Object.assign(this._headers, {
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    }).then(this._handleResponse);
  }

  removeCard(id) {
    return fetch(`${this._getCardsUrl()}/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse);
  }

  likeCard(id) {
    return fetch(`${this._getCardsUrl()}/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._handleResponse);
  }

  removeLike(id) {
    return fetch(`${this._getCardsUrl()}/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleResponse);
  }

  _getUsersUrl() {
    return `${this._getBaseUrl()}/users`;
  }

  _getCardsUrl() {
    return `${this._getBaseUrl()}/cards`;
  }

  _getBaseUrl() {
    return `${this._baseUrl}/${this._groupId}`;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Произошла ошибка при выполнеии запроса. ${res.status} ${res.statusText}`);
  }
}
