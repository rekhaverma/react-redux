function statechange(state={}, action) {
    console.log("action==>",action)
    console.log("statechange2222==>",state)
   switch (action.type) {

    case 'REGISTER_REQUEST':
      return { registering: true };
    case 'REGISTER_SUCCESS':
      return {};
    case 'REGISTER_FAILURE':
      return {};

    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
      case 'USERS_FOUND':
      return {
        loggedIn: true,
        user: action.user
      };
      case 'USER_NOT_FOUND':
      return {
        loggedIn: true,
        user: {}
      };
    case 'LOGIN_FAILURE':
      return {};

    // case 'LOGIN':
    // return login(action.payload.email, action.payload.password, state, action);

    case 'LOGOUT':
    return Object.assign({},state, {user:""})

    case 'IMGUPLOAD':
    return Object.assign({},state, {user: action.payload})

    case 'ACCOUNT_FIELDS':
    return Object.assign({},state, {user:""});

    case 'EMAIL_FIELDS':
    return Object.assign({},state, {user:""});

    default:
      return state
   }
}

export default statechange;