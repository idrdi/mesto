export default class UserInfo {
  constructor(selectors) {
    this._username = document.querySelector(selectors.usernameSelector);
    this._about = document.querySelector(selectors.aboutSelector);
    this._avatar = document.querySelector(selectors.avatarSelector);
  }

  getUserInfo() {
    return {
      _id: this._id,
      name: this._username.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(userInfo) {
    this._id = userInfo._id;
    this._username.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}
