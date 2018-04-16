import { browserHistory } from 'react-router';
export const LOGIN = 'LOGIN';
export const LOGOUT='LOGOUT';
export const IMGUPLOAD='IMGUPLOAD';
export const ACCOUNT_FIELDS='ACCOUNT_FIELDS';
export const EMAIL_FIELDS='EMAIL_FIELDS';
export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS =  'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE=  'USERS_REGISTER_FAILURE';
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS =  'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const USERS_FOUND = 'USERS_FOUND';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
// export const LOGOUT = 'USERS_LOGOUT'
let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || [];


export function getActiveUserData() {
  return dispatch => {
        checkForToken()
            .then(
                user => {
                    // Handle response.
                    user = handleResponse(user)
                    dispatch(success(user));
                    return user;
                },
                error => {
                  alert(error);
                    dispatch(failure(error));
                }
            );
    };
  function success(user) { return { type: USERS_FOUND, user } }
  function failure(error) { return { type: USER_NOT_FOUND, error } }
}




function checkForToken() {
    return new Promise((resolve, reject) => {
      // authenticateUser()
      // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
      if (user && user.token === 'fake-jwt-token') {
          let activeUser = users.filter(userData => { return user.email === userData.email; })
          resolve({ ok: true, json: () => activeUser });
      } else {
          // return 401 not authorised if token is null or invalid
          reject('Unauthorised');
      }

      return;
    });
}


export function login(email,password) {
    console.log("login called",email,password)
  return dispatch => {
        dispatch(request({ email,password }));
        authenticateLogin(email,password)
            .then(
                user => {
                    dispatch(success(user));
                    // Handle response.
                    user = handleResponse(user)
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                    browserHistory.push('/');
                    return user;
                },
                error => {
                  alert(error);
                    dispatch(failure(error));
                }
            );
    };
  function request(user) { return { type: LOGIN_REQUEST, user } }
  function success(user) { return { type: LOGIN_SUCCESS, user } }
  function failure(error) { return { type:LOGIN_FAILURE, error } }
}

function authenticateLogin(email, password) {
    return new Promise((resolve, reject) => {
      // find if any user matches login credentials
    let filteredUsers = users.filter(user => {
        return user.email === email && user.password === password;
    });

    if (filteredUsers.length) {
        // if login details are valid return user details and fake jwt token
        let user = filteredUsers[0];
        let responseJson = {
            id: user.id,
            email:user.email,
            token: 'fake-jwt-token'
        };
        resolve({ ok: true, json: () => responseJson });
    } else {
        // else return error
        reject('Username or password is incorrect');
    }
    });
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  return { type: LOGOUT };
}

export function saveImage(data) {
   return {
      type: IMGUPLOAD,
      payload: data

   };
}

export function setAccountFields(data) {
  console.log("data===>",data)
  return {
      type: ACCOUNT_FIELDS,
   };
}

export function setEmailFields(data) {
  console.log("data===>",data)
  return {
      type: EMAIL_FIELDS,
   };
}


export function register(user) {
    return dispatch => {
        dispatch(request({ user }));
        registerUser(user)
            .then(
                user => {
                    dispatch(success(user));
                    browserHistory.push('/login');
                },
                error => {
                  alert(error);
                    dispatch(failure(error));
                }
            );
    };

  function request(user) { return { type: REGISTER_REQUEST, user } }
  function success(user) { return { type: REGISTER_SUCCESS, user } }
  function failure(error) { return { type: REGISTER_FAILURE, error } }
}

export function registerUser(newUser) {

  return new Promise((resolve, reject) => {
    let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
    if (duplicateUser) {
        reject('Email "' + newUser.email + '" is already taken');
        return;
    }
    // Save new user
    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // respond 200 OK
    resolve({ ok: true, json: () => ({}) });
  });
}

// handle response!!!!
function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}






