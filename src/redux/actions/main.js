export const put_data = (key, data) => ({
	type: "PUT_DATA",
	key,
	data,
})

export const check_role = () => {
  return (dispatch) => {
    dispatch(put_data("role", "nurse"))
  }
}