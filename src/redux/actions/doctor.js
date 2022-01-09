import axios from 'axios';
import * as main from './main';

export const put_data_doctor = (key, data) => ({
	type: "PUT_DATA_DOCTOR",
	key,
	data,
})

export const get_profile_doctor = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get("doctors/" + id)
      .then((resp) => {        
        console.log(resp.data)
        dispatch(put_data_doctor("profile_data", resp.data.data))
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.error?.message));
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
    });    
  }
}

export const get_doctor_data = (url, state_key) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {        
        dispatch(put_data_doctor(state_key, resp.data.data))
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.error?.message));
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
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

export const get_outpatient = () => {
  return (dispatch) => {
    console.log("masuk")
    const initialOutpatientData = [
      {
        label: "Patient Name",
        value: "Syifa Fauziah",
      },      
      {
        label: "Age",
        value: "12",
      },
      {
        label: "Gender",
        value: "12",
      },
      {
        label: "Doctor Name",
        value: "dr. Angga",
      },
      {
        label: "Keluhan",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna, maximus sed sodales eget, pharetra eget sapien. Nulla nunc ex, cursus ut rutrum nec, rutrum euismod orci. Aenean non semper augue.",
      },
    ];
    dispatch(put_data_doctor("outpatient_data", initialOutpatientData))
  }
}