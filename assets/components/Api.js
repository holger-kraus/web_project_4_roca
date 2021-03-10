class Api {

  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getProfile() {
    const profileUri = this.baseUrl.concat("/users/me");
    return this._getResource(profileUri);
  }

  updateProfile(name, about) {
    const profileUri = this.baseUrl.concat("/users/me");
    const body = JSON.stringify({
      name: name,
      about: about
    });
    return this._sendRequestWithBody(profileUri, body, "PATCH");
  }

  updateProfilePicture(avatarLink) {
    const profileUri = this.baseUrl.concat("/users/me/avatar");
    const body = JSON.stringify({
      avatar: avatarLink
    });
    return this._sendRequestWithBody(profileUri, body, "PATCH");
  }

  getInitialCards() {
    const cardsUri = this.baseUrl.concat("/cards");
    return this._getResource(cardsUri);
  }

  addCard(name, link) {
    const cardsUri = this.baseUrl.concat("/cards");
    const body = JSON.stringify( {
      name: name,
      link: link
    });
    return this._sendRequestWithBody(cardsUri, body, "POST");
  }

  deleteCard(cardId) {
    const cardUri = this.baseUrl.concat("/cards/").concat(cardId);
    return this._sendRequestWithoutBody(cardUri, "DELETE");
  }

  addLike(cardId) {
    const likeUri = this.baseUrl.concat("/cards/likes/").concat(cardId);
    return this._sendRequestWithoutBody(likeUri, "PUT");
  }

  deleteLike(cardId) {
    const likeUri = this.baseUrl.concat("/cards/likes/").concat(cardId);
    return this._sendRequestWithoutBody(likeUri, "DELETE");
  }

  _getResource(uri) {
    return fetch(uri, {
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _sendRequestWithoutBody(uri, method) {
    return fetch(uri, {
      method: method,
      headers: this.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _sendRequestWithBody(uri, body, method) {
    return fetch(uri, {
      method: method,
      headers: this.headers,
      body: body
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Authorization": ""
  }
});

export default api;
