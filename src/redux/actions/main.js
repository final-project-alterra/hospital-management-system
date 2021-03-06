import axios from 'axios';
import { Modal } from 'antd';
import * as admin from './admin';

export const put_data = (key, data) => ({
	type: "PUT_DATA",
	key,
	data,
})

export const toggle_loader = (bool) => ({
  type: 'TOGGLE_LOADER',
  bool
})

export const modal_success = (msg) => {
  return () => {
    Modal.success({
      content: msg,
      centered: true,
    });
  }
}

export const check_role = () => {
  return (dispatch) => {
    dispatch(put_data("role", "nurse"))
  }
}

export const get_profile_data = (url) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .get(url)
      .then((resp) => {        
        let data = resp.data.data;        
        dispatch(put_data("user_data", data))
      })
      .catch((err) => {      
        // dispatch(error(err?.response?.data))
        console.log(err);
      })
      .then(() => {
        dispatch(toggle_loader(false));
      });
  }
}

export const put_update_data = (url, payload, history, nextPage) => {
  return (dispatch) => {
    dispatch(toggle_loader(true));
    axios
      .put(url, payload)
      .then((resp) => {        
        history.push(nextPage);
        dispatch(modal_success(resp.data?.meta?.message));
      })
      .catch((err) => {     
        let msgErr = err?.response?.data?.message || err?.response?.data?.error?.message;        
        dispatch(error(msgErr));
        console.log(err);
      })
      .then(() => {
        dispatch(toggle_loader(false));
        if(url === "outpatients/cancel") {
          let arrString = nextPage.split("/");
          dispatch(admin.get_schedule_detail(arrString[arrString.length-1]));
        }
      });
  }
}

export const error = (msg) => {
  return () => {
    Modal.error({
      title: 'Error!!',
      content: msg,
      centered: true,
    });
  }
}