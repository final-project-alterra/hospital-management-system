const admin_state = {
	profile_data: false,
	schedule_data: false,
	schedule_outpatient_data: false,
	outpatient_data: false,
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