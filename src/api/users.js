// This is the base path of the Express route we'll define

const BASE_URL = "https://moosage-backend.onrender.com/users";

export async function signUp(userData) {
  const createURL = BASE_URL + "/create";

  const res = await fetch(createURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getLoginDetails(email) {
  const searchParams = new URLSearchParams({ email: email });
  const getLoginDetailsURL = BASE_URL + "/login?" + searchParams;

  const res = await fetch(getLoginDetailsURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid User");
  }
}

export async function loginUser(userData) {
  const loginURL = BASE_URL + "/login";

  const res = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Login");
  }
}

export async function logoutUser(token, userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const logoutURL = BASE_URL + "/logout";
  const res = await fetch(logoutURL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Logout");
  }
}
