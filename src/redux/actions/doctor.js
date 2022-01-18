import axios from 'axios';
import { format } from 'date-fns';
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

export const get_schedule_doctor = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get('work-schedules')
      .then((resp) => {
        let newData = resp.data.data.filter(dt => dt.doctor.id === id)        
        console.log("id", id)
        console.log("new", newData)
        newData = newData.map((dt) => {
          return {            
            key: dt.id,
            schedule: format(new Date(dt.date), 'dd MMM yyyy'),
            nurse: dt.nurse.name,
            rangeTime: format(new Date(dt.date + " " +dt.startTime), 'HH:mm') + "-" + format(new Date(dt.date + " " + dt.endTime), 'HH:mm'),            
          }
        })        
        dispatch(put_data_doctor("schedule_data", newData))
      })
      .catch((err) => {      
        // dispatch(error(err?.response?.data))
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
  // return (dispatch) => {
  //   const initialScheduleData = [
  //     {
  //       key: '1',
  //       jadwal: '21 Desember 2021',
  //       nurse: 'Sarani',
  //       jamKerja: "16.00 - 21.00",        
  //     },
  //     {
  //       key: '2',
  //       jadwal: '23 Desember 2021',
  //       nurse: 'Sarani',
  //       jamKerja: "16.00 - 21.00",        
  //     },
  //     {
  //       key: '3',
  //       jadwal: '23 Desember 2021',
  //       nurse: 'Sarani',
  //       jamKerja: "16.00 - 21.00",        
  //     },
  //   ]
  //   dispatch(put_data_doctor("schedule_data", initialScheduleData))
  // }
}

export const get_schedule_outpatient_doctor = (id) => {
  // return (dispatch) => {
  //   const initialScheduleOutpatientData = [
  //     {
  //       key: '1',
  //       patient: 'Arya',
  //       age: 32,
  //       status: "Onprogress",
  //     },
  //     {
  //       key: '2',
  //       patient: 'Wira Wirawan',
  //       age: 21,
  //       status: "Waiting",
  //     },
  //     {
  //       key: '3',
  //       patient: 'Nugi',
  //       age: 24,
  //       status: "Waiting",
  //     },
  //   ]
  //   dispatch(put_data_doctor("schedule_outpatient_data", initialScheduleOutpatientData))
  // }
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`work-schedules/${id}`)
      .then((resp) => {        
        let data = resp.data.data.outpatients;              
        data = data.map((dt) => {          
          return {              
            key: dt.id,
            complaint: dt.complaint,            
            patient: dt.patient.name,            
            status: dt.status === 1? "Finished" : dt.status === 2? "On-Progress" : dt.status === 3? "Waiting": 'Canceled',
          }
        })        
        dispatch(put_data_doctor("schedule_outpatient_data", data))
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

export const get_outpatient = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`outpatients/${id}`)
      .then((resp) => {
        dispatch(put_data_doctor("outpatient_data", resp.data.data))
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