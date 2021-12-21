const admin_state = {
	highlight_data: [],
}

const admin = (state = admin_state, action) => {
    switch (action.type) {		
      case "PUT_DATA_ADMIN":
        return { ...state, [action.key]: action.data };		
      default:
        return state;
	}
};

export default admin;