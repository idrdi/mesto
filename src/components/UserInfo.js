export default class UserInfo {
  constructor(usernameSelector, aboutSelector) {
    this._username = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    var result = {};

    result.username = this._username.textContent;
    result.about = this._about.textContent;

    return result;
  }

  setUserInfo(username, about) {
    this._username.textContent = username;
    this._about.textContent = about;
  }
}
