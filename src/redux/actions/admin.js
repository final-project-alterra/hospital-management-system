import axios from 'axios';
import { format } from 'date-fns';
import * as main from './main';

export const put_data_admin = (key, data) => ({
	type: "PUT_DATA_ADMIN",
	key,
	data,
})

export const get_data = (url, state_key) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {
        
        let data = resp.data.data;
        if(Array.isArray(data)) {
          data = data.map((dt) => {
            return {
              ...dt,
              key: dt.id
            }
          })
        }
        dispatch(put_data_admin(state_key, data))
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.error?.message));        
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
}

export const post_admin_data = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .post(url, payload)
      .then((resp) => {        
        history.push(nextPage);
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

export const put_admin_data = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .put(url, payload)
      .then((resp) => {        
        history.push(nextPage);
        dispatch(main.modal_success(resp.data?.meta?.message));
      })
      .catch((err) => {     
        let msgErr = err?.response?.data?.message || err?.response?.data?.error?.message;        
        dispatch(main.error(msgErr));
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
      });
  }
}

export const delete_admin_data = (url, id, state_key) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .delete(`${url}/${id}`)
      .then((resp) => {        
        dispatch(main.modal_success(resp.data?.meta?.message));
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.message));
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
        if(url === "doctors") {
          dispatch(get_list_doctors())
        } else if(url === "work-schedules") {          
          dispatch(get_schedule());
        } else if(url === "outpatients") {          
          dispatch(get_outpatient());
        } else {
          dispatch(get_data(url, state_key))
        }
      });
  }
}

export const get_list_doctors = (key) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get('doctors')
      .then((resp) => {        
        let newData = resp.data.data.map((dt) => {
          return {
            id: dt.id,
            key: dt.id,
            name: dt.name,
            speciality: dt.speciality.name,
            phone: dt.phone,
            age: dt.age,
          }
        })
        if (key) {
          newData = newData.filter((dt) => dt.name.includes(key))
        }
        dispatch(put_data_admin("doctor_list", newData))
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
export const get_data_doctor = (id) => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`doctors`)
      .then((resp) => {
        let newData = resp.data.data.map((dt) => {
          return {
            id: dt.id,
            name: dt.name,
            speciality: dt.speciality.name,
            phone: dt.phone,
            age: dt.age,
          }
        })        
        dispatch(put_data_admin("doctor_data", newData))
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

export const get_outpatient = () => {
  // return (dispatch) => {
  //   const initialOutpatientList = [
  //     {
  //       key: '1',
  //       patientName: 'Mike',
  //       doctorName: "dr Shang chi",
  //       spealization: "Anak dan Kandungan",
  //       status: 'On-Progress',
  //     },      
  //     {
  //       key: '2',
  //       patientName: 'Wong',
  //       doctorName: "dr. Strange",
  //       spealization: "Ilmu Hitam dan Sihir",
  //       status: 'Waiting',
  //     },      
  //     {
  //       key: '3',
  //       patientName: 'Tom Holland',
  //       doctorName: "dr. Octavius",
  //       spealization: "Hewan",
  //       status: 'Finished',
  //     },
  //   ];    
  //   dispatch(put_data_admin("outpatient_list", initialOutpatientList));    
  // }
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`outpatients`)
      .then((resp) => {
        let newData = resp.data.data.map((dt) => {
          return {            
            key: dt.id,
            date: format(new Date(dt.date), 'dd MMM yyyy'),
            patientName: dt.patient.name,
            doctorName: dt.doctor.name,
            spealization: dt.doctor.specialty,
            status: dt.status === 1? "Finished" : dt.status === 2? "On-Progress" : dt.status === 3? "Waiting": 'Canceled',
          }
        })        
        dispatch(put_data_admin("outpatient_list", newData))
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

export const get_schedule = () => {  
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get("work-schedules")
      .then((resp) => {        
        let data = resp.data.data;
        if(Array.isArray(data)) {
          data = data.sort((a, b) => new Date(a.date) - new Date(b.date))          
          data = data.map((dt) => {            
            return {              
              key: dt.id,
              jadwal: format(new Date(dt.date), 'dd MMM yyyy'),
              doctorName: dt.doctor.name,
              nurseName: dt.nurse.name,
              rangeTime: format(new Date(dt.date + " " +dt.startTime), 'HH:mm') + "-" + format(new Date(dt.date + " " + dt.endTime), 'HH:mm'),
            }
          })
        }
        dispatch(put_data_admin("schedule_list", data))
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

export const get_schedule_detail = (id) => {  
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get(`work-schedules/${id}`)
      .then((resp) => {        
        let data = resp.data.data.outpatients;              
        data = data.map((dt) => {          
          return {              
            key: dt.id,
            patientName: dt.patient.name,            
            status: dt.status === 1? "Finished" : dt.status === 2? "On-Progress" : dt.status === 3? "Waiting": 'Canceled',
          }
        })        
        dispatch(put_data_admin("schedule_detail_list", data))
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

export const get_detail_outpatient = () => {
  return (dispatch) => {
    const initialOutpatientData = [
      {
        label: "Patient Name",
        value: "Assyifa Rafta",
      },      
      {
        label: "Age",
        value: "21",
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
    const initialPrescriptionList = [
      {
        name: 'Obat Oskadon',
        instruction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna',
      },
      {
        name: 'Obat Neozep',
        instruction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna',
      },
      {
        name: 'Obat Neozep',
        instruction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan vulputate pretium. Nullam suscipit, purus ac finibus dictum, est nisi egestas mauris, non mollis tortor quam id enim. Morbi est magna',
      },
    ];
    dispatch(put_data_admin("prescription_list", initialPrescriptionList));
    dispatch(put_data_admin("outpatientt_data", initialOutpatientData));
  }
}