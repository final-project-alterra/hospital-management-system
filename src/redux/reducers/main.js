const main_state = {
	login: false,
  loader: false,
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  role: false,
  user_data: false,
}

const main = (state = main_state, action) => {
    switch (action.type) {		
      case "PUT_DATA":
        return { ...state, [action.key]: action.data };		
      case "TOGGLE_LOADER":
        return { ...state, loader: action.bool };		
      default:
        return state;
	}
};

export default main;