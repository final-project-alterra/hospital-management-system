export const put_data_admin = (key, data) => ({
	type: "PUT_DATA_ADMIN",
	key,
	data,
})

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