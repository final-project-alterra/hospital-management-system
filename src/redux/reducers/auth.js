const auth_state = {
	user_jwt_data: false,
  user_token: false,
  isAuthenticated: false,
}

const auth = (state = auth_state, action) => {
    switch (action.type) {		
      case "PUT_AUTH_DATA":
        return { ...state, [action.key]: action.data };		      
      default:
        return state;
	}
};

export default auth;