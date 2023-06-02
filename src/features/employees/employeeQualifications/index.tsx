class UrlBuilder {
  #protocol = 'http';
  #host = '';
  #port = null;
  #path = '';
  #queryParams = {};

  https() {
    this.#protocol = 'https';
  }

  host(hostName) {
    this.#host = hostName;
  }

  port(portValue) {
    this.#port = portValue;
  }

  path(pathValue) {
    this.#path = pathValue;
  }

  queryParams(params) {
    this.#queryParams = params;
  }

  build() {
    let url = `${this.#protocol}://${this.#host}`;

    if (this.#port) {
      url += `:${this.#port}`;
    }

    url += `/${this.#path}`;

    url += this.#paramsToString() || '';

    return url;
  }

  #paramsToString() {
    return Object.entries(this.#queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
}

module.exports = UrlBuilder;
