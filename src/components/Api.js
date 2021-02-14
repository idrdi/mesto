export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._groupId = options.groupId;
  }

  getCards() {
    return fetch(this._getCardsUrl(), {
      headers: this._headers
    }).then(res => this._handleResponse(res));
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

    return Promise.reject(`Произошла ошибка при выполнеии запроса. ${res.status}`);
  }
}
