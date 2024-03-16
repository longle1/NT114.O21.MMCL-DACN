import React, { useState } from 'react';
import './SideBar.css'
import '../Modal/InfoModal/InfoModal.css'
import { useDispatch } from 'react-redux';
import { drawer_edit_form_action } from '../../redux/actions/DrawerAction';
import TaskForm from '../Forms/TaskForm';
import { NavLink, useParams } from 'react-router-dom';
import { userLoggedoutAction } from '../../redux/actions/UserAction';
import { showNotificationWithIcon } from '../../util/NotificationUtil';
const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const { id } = useParams()


    return (
        <div className={`page-wrapper ${isSidebarOpen ? 'toggled' : ''}`}>
            <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={toggleSidebar} style={{ zIndex: 9999 }}>
                <i className="fas fa-bars"></i>
            </a>
            <nav id="sidebar" className="sidebar-wrapper bg-dark">
                <div>
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="/home">Project</a>
                            <div id="close-sidebar" onClick={closeSidebar}>
                                <i className="fas fa-times text-light" />
                            </div>
                        </div>
                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>General</span>
                                </li>
                                <li className="sidebar-dropdown font-weight-bold" style={{ fontSize: '17px' }} onClick={() => {
                                    if(id) {
                                        dispatch(drawer_edit_form_action(<TaskForm />))
                                    }else {
                                        showNotificationWithIcon('error', 'Create Issue', 'Vui long tham gia vao du an truoc khi tao van de')
                                    }
                                }}>
                                    <NavLink href="#">
                                        <i style={{ fontSize: '17px' }} className="fa-solid fa-plus text-light"></i>
                                        <span className='text-light'>Create Issue</span>
                                    </NavLink>
                                </li>
                                <li className="sidebar-dropdown font-weight-bold" style={{ fontSize: '17px' }}>
                                    <NavLink href="#">
                                        <i style={{ fontSize: '17px' }} className="fa-solid fa-magnifying-glass  text-light"></i>
                                        <span className='text-light'>Search Issues</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar-footer">
                        <NavLink href="#">
                            <i className="fa fa-bell" />
                            <span className="badge badge-pill badge-warning notification">3</span>
                        </NavLink>
                        <NavLink href="#">
                            <i className="fa fa-envelope" />
                            <span className="badge badge-pill badge-success notification">7</span>
                        </NavLink>
                        <NavLink href="#">
                            <i className="fa fa-cog" />
                            <span className="badge-sonar" />
                        </NavLink>
                        <NavLink href="#" onClick={() => {
                            dispatch(userLoggedoutAction())
                        }}>
                            <i className="fa fa-power-off" />
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;