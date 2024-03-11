import React from 'react'
import MenuBar from '../components/MenuBar/MenuBar'
import InfoModal from '../components/Modal/InfoModal/InfoModal'
import SideBar from '../components/SideBar/SideBar'
import '../components/MenuBar/MenuBar.css'
import '../components/Dashboard/Dashboard.css'
import '../components/SideBar/SideBar.css'
import '../components/Modal/InfoModal/InfoModal.css'
import DrawerHOC from '../HOC/DrawerHOC'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function MainPageTemplate({ Component }) {
    const status = useSelector(state => state.user.status)

    return (
        status ? (
            <div className='d-flex' style={{ overflow: "hidden" }}>
                <DrawerHOC />
                <SideBar />
                <MenuBar />
                <div style={{ width: '100%' }} className='main'>
                    <Component />
                </div>
                <InfoModal />
            </div>
        ) : (<Navigate to='/login' />)
    )
}
