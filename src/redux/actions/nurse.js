import axios from 'axios';
import { format } from 'date-fns';
import * as main from './main';

export const put_data_nurse = (key, data) => ({
	type: "PUT_DATA_NURSE",
	key,
	data,
})

export const get_profile_nurse = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get("doctors/" + id)
      .then((resp) => {        
        dispatch(put_data_nurse("profile_data", resp.data.data))
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

export const get_nurse_data = (url, state_key) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {        
        dispatch(put_data_nurse(state_key, resp.data.data))
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

export const get_schedule_nurse = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get('work-schedules')
      .then((resp) => {        
        let data = resp.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        let newData = data.filter(dt => dt.nurse.id === id);
        newData = newData.map((dt) => {
          return {            
            key: dt.id,
            schedule: format(new Date(dt.date), 'dd MMM yyyy'),
            doctor: dt.doctor.name,
            rangeTime: format(new Date(dt.date + " " +dt.startTime), 'HH:mm') + "-" + format(new Date(dt.date + " " + dt.endTime), 'HH:mm'),            
          }
        })
        dispatch(put_data_nurse("schedule_data", newData))
      })
      .catch((err) => {      
        // dispatch(error(err?.response?.data))
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
}

export const get_schedule_outpatient_nurse = (id) => {  
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`work-schedules/${id}`)
      .then((resp) => {
        let data = resp.data.data.outpatients;
        data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        data = data.map((dt, key) => ({...dt, noQueue: key+1}));
        data = data.sort((a, b) => a.status - b.status)
        data = data.map((dt) => {
          return {
            key: dt.id,
            noQueue: dt.noQueue,
            complaint: dt.complaint,
            patient: dt.patient.name,
            status: dt.status === 1? "On-Progress" : dt.status === 2? "Waiting" : dt.status === 3? "Finished": 'Canceled',
          }
        })
        dispatch(put_data_nurse("schedule_outpatient_data", data))
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