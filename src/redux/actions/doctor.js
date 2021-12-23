export const put_data_doctor = (key, data) => ({
	type: "PUT_DATA_DOCTOR",
	key,
	data,
})

export const get_profile_doctor = () => {
  return (dispatch) => {
    const initialProfileData = {
      name: 'Alfi',
      email: 'alfi@mail.com',
      gender: 'Laki-Laki',
      age: 31,
      phone: '0812737272822',
      address: 'jl menuju neraka',
      registDate: '15 September 2021',
    }
    dispatch(put_data_doctor("profile_data", initialProfileData))
  }
}