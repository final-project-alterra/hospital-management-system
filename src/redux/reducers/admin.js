const admin_state = {
	highlight_data: [],
  outpatient_data: false,
  outpatient_list: [],
  schedule_list: [],
  schedule_detail_list: [],
  prescription_list: [],
  modal_form_utils_spealization: false,
  modal_form_utils_room: false,
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