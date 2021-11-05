import getEndpoint from './getEndpoint';

const jsonHeader = () => 'application/json';
const authHeader = (token) => `Bearer ${token}`;
const joinURL = (baseURL, target) => `${baseURL}${target}`;

export default class Http {
  constructor() {
    this.endpoint = getEndpoint();
  }

  request(
    url,
    method,
    includeHeaderJSON,
    includeHeaderAuth,
    includeDomain,
    token = null,
    data = null,
  ) {
    url = includeDomain ? joinURL(this.endpoint, url) : url;
    let headers = {};

    includeHeaderJSON ? (headers['Content-Type'] = jsonHeader()) : null;
    includeHeaderAuth ? (headers.Authorization = authHeader(token)) : null;

    const options = {
      method,
      headers,
    };

    data ? (options.body = JSON.stringify({ ...data })) : null;

    return fetch(url, options);
  }

  get(url, includeHeaderAuth, includeDomain, token) {
    const method = 'GET';
    return this.request(
      url,
      method,
      false,
      includeHeaderAuth,
      includeDomain,
      token,
    ).then((data) => data.json());
  }

  post(url, includeHeaderJSON, includeHeaderAuth, includeDomain, token, data) {
    const method = 'POST';

    return this.request(
      url,
      method,
      includeHeaderJSON,
      includeHeaderAuth,
      includeDomain,
      token,
      data,
    ).then((data) => data.json());
  }

  delete(
    url,
    includeHeaderJSON,
    includeHeaderAuth,
    includeDomain,
    token,
    data,
  ) {
    const method = 'DELETE';

    return this.request(
      url,
      method,
      includeHeaderJSON,
      includeHeaderAuth,
      includeDomain,
      token,
      data,
    ).then((data) => data.json());
  }

  patch(url, includeHeaderJSON, includeHeaderAuth, includeDomain, token, data) {
    const method = 'PATCH';

    return this.request(
      url,
      method,
      includeHeaderJSON,
      includeHeaderAuth,
      includeDomain,
      token,
      data,
    ).then((data) => data.json());
  }
}
