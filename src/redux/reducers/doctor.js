const admin_state = {
	profile_data: false,
}

const admin = (state = admin_state, action) => {
    switch (action.type) {		
      case "PUT_DATA_DOCTOR":
        return { ...state, [action.key]: action.data };		
      default:
        return state;
	}
};

export default admin;