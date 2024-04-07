const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl =
  window.location.hostname === "localhost" ? `http://localhost:${port}` : "";

/**
 * Fetches data from the server using the provided user data and page.
 * @param {Object} userData - The user data to be sent in the request body.
 * @param {string} page - The page to fetch data from.
 * @returns {Promise<Response>} - A promise that resolves to the response from the server.
 */
async function fetchData(userData, page) {
  const headers = {
    "Content-Type": "application/json",
  };

  // Retrieve the "user" item from localStorage
  //CHANGE THIS
  // const userItem = localStorage.getItem("sp") || localStorage.getItem("admin") || localStorage.getItem("user");

  let userItem;

  if (page === "register-admin" && localStorage.getItem("sp")) userItem = localStorage.getItem("sp");
  else if ((page === "addmoney" || page === "check-password") && localStorage.getItem("admin")) userItem = localStorage.getItem("admin");
  else if (localStorage.getItem("user")) userItem = localStorage.getItem("user");

  // Check if "user" item exists and contains a token
  if (userItem) {
    // Parse the JSON string to extract the token
    const { token } = JSON.parse(userItem);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
  }

  return await fetch(`${baseUrl}/api/${encodeURI(page)}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });
}

/**
 * Sends user data to the server.
 * @param {Object} userData - The user's name, surname and token to be sent to the server and validated.
 * @param {string} page - The page where the data is being sent from.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
 * @throws {Error} - An error with the error message from the server will be thrown.
 */
export async function sendUserData(userData, page) {
  try {
    const response = await fetchData(userData, page);
    const data = await response.json();
    if (response.status === 401) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("Error in sendUserData:", err);
  }
}

/**
 * Retrieves user data from the server.
 *
 * @param {Object} userData - The user's name, surname and token to be sent to the server and validated.
 * @returns {Promise<Object>} - A promise that resolves to the user's profile image and money count retrieved from the server.
 * @throws {Error} - If an error occurs while fetching the user data.
 */
export async function getUserData(userData) {
  try {
    const response = await fetchData(userData, "getuser");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in getUserData");
  }
}

/**
 * Validates the password for a user.
 *
 * @param {string} name - The name of the user.
 * @param {string} surname - The surname of the user.
 * @param {string} password - The password to be validated.
 * @param {string} [type="main"] - The type of password to be validated.
 * @returns {Promise<any>} - A promise that resolves to a boolean value.
 * @throws {Error} - If an error occurs during the validation process.
 */
export async function validatePassword(name, surname, password, type = "main") {
  try {
    const response = await fetchData(
      { name: name, surname: surname, password: password, type: type },
      "check-password"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in validatePassword");
  }
}

/**
 * Retrieves all users from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects which only include the user names, money counts and images.
 * @throws {Error} If an error occurs while fetching the data.
 */
export async function getAllUsers() {
  try {
    const response = await fetch(`${baseUrl}/api/getallusers`);
    if (!response.ok) throw new Error("Something went wrong in getAllUsers");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in getAllUsers");
  }
}

/**
 * Checks if a user exists based on the provided name, surname, and type.
 * @param {string} name - The name of the user.
 * @param {string} surname - The surname of the user.
 * @param {string} type - The type of the user.
 * @returns {Promise<any>} - A promise that resolves to a boolean value.
 * @throws {Error} - If there is an error while checking the user status.
 */
export async function userExists(name, surname, type) {
  try {
    const response = await fetchData(
      { name: name, surname: surname, type: type },
      "check-status"
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "Error in userExists");
  }
}

/**
 * Handles google drive data by making an API request.
 *
 * @param {string} name - The name of the person.
 * @param {string} surname - The surname of the person.
 * @param {number} imgNum - The image number.
 * @param {string} action - The action to perform. Can be "get", "set", or "delete".
 * @param {undefined|File} img - The image file (optional).
 * @returns {Promise<Object>} - The response data from the API.
 * @throws {Error} - If an error occurs during the API request.
 */
export async function handleDriveData(
  name,
  surname,
  imgNum,
  action,
  img = undefined
) {
  try {
    const response = await fetchData(
      { name: name, surname: surname, img: img, imgNum: imgNum },
      `${action}-image`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "Error in handleDriveData");
  }
}

/**
 * Checks if a name and surname corresponds to an admin account.
 *
 * @param {string} name - The name of the user.
 * @param {string} surname - The surname of the user.
 * @returns {Promise<any>} - A promise that resolves to the admin data.
 * @throws {Error} - If there is an error in handling the admin data.
 */
export async function checkIfAdmin(name, surname) {
  try {
    const response = await fetchData({ name: name, surname: surname }, 'admin-token');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err, "Error in handleDriveData");
  }
}


/**
 * Retrieves the global chat data.
 * @returns {Promise<Object>} The global chat data.
 * @throws {Error} If an error occurs while fetching the data.
 */
export async function getGlobalChat() {
  try {
    const response = await fetchData({}, 'get-chat');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in getGlobalChat", err);
  }
}

/**
 * Sends a global chat message.
 * 
 * @param {string} message - The message to be sent.
 * @returns {Promise} - A promise that resolves to the response data.
 * @throws {Error} - If an error occurs while sending the chat message.
 */
export async function sendGlobalChat(message) {
  try {
    const response = await fetchData(message, 'send-chat');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in sendGlobalChat", err);
  }
}


/**
 * Handles votes by sending a request to the server and returning the response data.
 * @param {Array} votes - An array with vote values as elements.
 * @returns {Promise} - A promise that resolves to the response data.
 */
export async function handleVotes(votes) {
  try {
    const response = await fetchData(votes, 'video-votes');
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error("Error in handleVotes", err);
  }
}