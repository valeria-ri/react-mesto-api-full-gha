export const BASE_URL = "https://api.valeriari.mesto.nomoredomains.work";

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  };

  return fetch(`${BASE_URL}${url}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`Ошибка код ${res.status}`);
    });
}

export const register = (password, email) => {
  return makeRequest(
    "/signup",
    "POST",
    {password, email}
  )
};

export const authorize = (password, email) => {
  return makeRequest(
    "/signin",
    "POST",
    {password, email}
  )
};

export const getUserData = (token) => {
  return makeRequest(
    "/users/me",
    "GET",
    null,
    token
  )
};