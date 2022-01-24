const nurse_state = {
	profile_data: false,
	schedule_data: false,
	schedule_outpatient_data: false,
	outpatient_data: false,
  modal_create_prescription: false,
}

const nurse = (state = nurse_state, action) => {
    switch (action.type) {		
      case "PUT_DATA_NURSE":
        return { ...state, [action.key]: action.data };		
      default:
        return state;
	}
};

export default nurse;