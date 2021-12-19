import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrganismsDashboardCardGroup from '../../../components/organisms/dashboard/cardGroup'
import LayoutsCms from '../../../layouts/cms'
import { put_data_admin } from '../../../redux/actions/admin'
import './style.scss'

const AdminDashboard = () => {
  const highlight_data = [
    {
      title: "Total Patient",
      total: "22.000"
    },    
    {
      title: "Total Doctor",
      total: "22.000"
    },
    {
      title: "Total Outpatient",
      total: "22.000"
    },
  ]
  const dispatch = useDispatch()  
  useEffect(() => {
    dispatch(put_data_admin("highlight_data", highlight_data))
    // eslint-disable-next-line
  }, [])
  const highlights = useSelector(state => state.admin?.highlight_data)
  console.log(highlights)
  return (
    <LayoutsCms>
      <div className='p-admin-dashboard'>
        halo
        <OrganismsDashboardCardGroup initialHighlightData={highlights} />
      </div>
    </LayoutsCms>
  )
}

export default AdminDashboard
