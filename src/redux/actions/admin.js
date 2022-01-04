import axios from 'axios';
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
        console.log("coba: ", resp.data)
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
        console.log(err);
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
        console.log("post: ", resp.data)
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
        console.log("post: ", resp.data)
        history.push(nextPage);
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.message));
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
        console.log("post: ", resp.data)        
      })
      .catch((err) => {      
        dispatch(main.error(err?.response?.data?.message));
        console.log(err);
      })
      .then(() => {
        dispatch(main.toggle_loader(false));
        if(url === "doctors") {
          dispatch(get_list_doctors())
        } else {
          dispatch(get_data(url, state_key))
        }
      });
  }
}

export const get_list_doctors = () => {
  return (dispatch) => {
    dispatch(main.toggle_loader(true));
    axios
      .get('doctors')
      .then((resp) => {        
        let aa = resp.data.data.map((dt) => {
          return {
            id: dt.id,
            key: dt.id,
            name: dt.name,
            speciality: dt.speciality.name,
            phone: dt.phone,
            age: dt.age,
          }
        })
        console.log("Masuk: ", aa)
        dispatch(put_data_admin("doctor_list", aa))
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
        console.log("Masuk: ", newData)
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
  return (dispatch) => {
    const initialOutpatientList = [
      {
        key: '1',
        patientName: 'Mike',
        doctorName: "dr Shang chi",
        spealization: "Anak dan Kandungan",
        status: 'On-Progress',
      },      
      {
        key: '2',
        patientName: 'Wong',
        doctorName: "dr. Strange",
        spealization: "Ilmu Hitam dan Sihir",
        status: 'Waiting',
      },      
      {
        key: '3',
        patientName: 'Tom Holland',
        doctorName: "dr. Octavius",
        spealization: "Hewan",
        status: 'Finished',
      },
    ];    
    dispatch(put_data_admin("outpatient_list", initialOutpatientList));    
  }
}

export const get_schedule = () => {
  return (dispatch) => {
    const initialScheduletList = [
      {
        key: '1',
        jadwal: '12 Desember 2021',
        doctorName: "dr Shang chi",
        nurseName: "Shania",
        rangeTime: '08.00 - 12.00',
      },
      {
        key: '2',
        jadwal: '12 Desember 2021',
        doctorName: "dr Strange",
        nurseName: "Wanda",
        rangeTime: '08.00 - 12.00',
      },
      {
        key: '3',
        jadwal: '10 Desember 2021',
        doctorName: "dr Octavius",
        nurseName: "Kate",
        rangeTime: '08.00 - 12.00',
      },
      {
        key: '4',
        jadwal: '09 Desember 2021',
        doctorName: "dr Doom",
        nurseName: "Natasha",
        rangeTime: '08.00 - 12.00',
      },
    ];    
    dispatch(put_data_admin("schedule_list", initialScheduletList));    
  }
}

export const get_schedule_detail = () => {
  return (dispatch) => {
    const initialScheduleDetailList = [
      {
        key: '1',
        patientName: 'Jessica Jones',
        status: "OnProgress",
      },
      {
        key: '2',
        patientName: 'Luke Cage',
        status: "Waiting",
      },
      {
        key: '3',
        patientName: 'Matt Murdock',
        status: "Waiting",
      },
      {
        key: '4',
        patientName: 'Andy',
        status: "Finished",
      },
    ];    
    dispatch(put_data_admin("schedule_detail_list", initialScheduleDetailList));    
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
    dispatch(put_data_admin("outpatient_data", initialOutpatientData));
  }
}