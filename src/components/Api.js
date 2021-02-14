export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._groupId = options.groupId;
  }

  getMe() {
    return fetch(`${this._getUsersUrl()}/me`, {
      headers: this._headers
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(this._getCardsUrl(), {
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