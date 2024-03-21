import React, { useEffect } from 'react'
import MenuBar from '../components/MenuBar/MenuBar'
import InfoModal from '../components/Modal/InfoModal/InfoModal'
import SideBar from '../components/SideBar/SideBar'
import '../components/MenuBar/MenuBar.css'
import '../components/Dashboard/Dashboard.css'
import '../components/SideBar/SideBar.css'
import '../components/Modal/InfoModal/InfoModal.css'
import DrawerHOC from '../HOC/DrawerHOC'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { userLoggedInAction } from '../redux/actions/UserAction'
import { GetProjectAction } from '../redux/actions/ListProjectAction'
export default function MainPageTemplate({ Component }) {
    const status = useSelector(state => state.user.status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userLoggedInAction())
        console.log("localStorage.getItem('projectid')", localStorage.getItem('projectid'), localStorage.getItem('projectid') !== 'null');
        //lay ra project hien tai
        if(localStorage.getItem('projectid') !== 'null') {
            dispatch(GetProjectAction(localStorage.getItem('projectid')))
        }
    }, [])
    return (
        status ? (
            <div className='d-flex'>
                <DrawerHOC />
                <SideBar />
                <MenuBar />
                <div style={{ width: '100%' }} className='main'>
                    <Component />
                </div>
                <InfoModal />
            </div>
        ) : (<Navigate to="/login" />)
    )
}
