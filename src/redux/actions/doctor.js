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

export const get_schedule_doctor = () => {
  return (dispatch) => {
    const initialScheduleData = [
      {
        key: '1',
        jadwal: '21 Desember 2021',
        nurse: 'Sarani',
        jamKerja: "16.00 - 21.00",        
      },
      {
        key: '2',
        jadwal: '23 Desember 2021',
        nurse: 'Sarani',
        jamKerja: "16.00 - 21.00",        
      },
      {
        key: '3',
        jadwal: '23 Desember 2021',
        nurse: 'Sarani',
        jamKerja: "16.00 - 21.00",        
      },
    ]
    dispatch(put_data_doctor("schedule_data", initialScheduleData))
  }
}

export const get_schedule_outpatient_doctor = () => {
  return (dispatch) => {
    const initialScheduleOutpatientData = [
      {
        key: '1',
        patient: 'Arya',
        age: 32,
        status: "Onprogress",
      },
      {
        key: '2',
        patient: 'Wira Wirawan',
        age: 21,
        status: "Waiting",
      },
      {
        key: '3',
        patient: 'Nugi',
        age: 24,
        status: "Waiting",
      },
    ]
    dispatch(put_data_doctor("schedule_outpatient_data", initialScheduleOutpatientData))
  }
}