import React, { useEffect } from 'react'
import DrawerHOC from '../../HOC/DrawerHOC'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { getInfoIssue } from '../../redux/actions/IssueAction';
import { showNotificationWithIcon } from '../../util/NotificationUtil';
export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const projectInfo = useSelector(state => state.listProject.projectInfo)

    useEffect(() => {
        if (projectInfo === null) {
            localStorage.setItem('projectid', null)
            showNotificationWithIcon('error', 'Vui lòng tham gia vào dự án trước')
            navigate('/manager')
        } else {
            //set localstorage để khi user vào web thì sẽ vào thẳng dự án hiện tại
            localStorage.setItem('projectid', projectInfo?._id)
        }
    }, [])

    const renderIssueType = (type) => {
        //0 la story
        if (type === 0) {
            return <i className="fa-solid fa-bookmark mr-2" style={{ color: '#65ba43', fontSize: '20px' }} ></i>
        }
        //1 la task
        if (type === 1) {
            return <i className="fa-solid fa-square-check mr-2" style={{ color: '#4fade6', fontSize: '20px' }} ></i>
        }
        //2 la bug
        if (type === 2) {
            return <i className="fa-solid fa-circle-exclamation mr-2" style={{ color: '#cd1317', fontSize: '20px' }} ></i>
        }
    }

    const renderPriority = (priority) => {
        if (priority === 0) {
            return <i className="fa-solid fa-arrow-up" style={{ color: '#cd1317', fontSize: '20px' }} />
        }
        if (priority === 1) {
            return <i className="fa-solid fa-arrow-up" style={{ color: '#e9494a', fontSize: '20px' }} />
        }
        if (priority === 2) {
            return <i className="fa-solid fa-arrow-up" style={{ color: '#e97f33', fontSize: '20px' }} />
        }
        if (priority === 3) {
            return <i className="fa-solid fa-arrow-down" style={{ color: '#2d8738', fontSize: '20px' }} />
        }
        if (priority === 4) {
            return <i className="fa-solid fa-arrow-down" style={{ color: '#57a55a', fontSize: '20px' }} />
        }
    }

    const countEleStatus = (position) => {
        return projectInfo?.issues?.filter(value => value.issueStatus === position).length
    }

    const renderIssue = (position) => {
        return projectInfo?.issues?.map((value, index) => {
            if (value.issueStatus === position) {
                return (<li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }} onClick={() => {
                    dispatch(getInfoIssue(value._id))
                }}>
                    <p>
                        {value.shortSummary}
                    </p>
                    <div className="block" style={{ display: 'flex' }}>
                        <div className="block-left">
                            {renderIssueType(value.issueType)}
                            {renderPriority(value.priority)}
                        </div>
                        <div className="block-right" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="avatar-group">
                                {/* them avatar cua cac assignees */}
                                {
                                    value?.assignees?.map((user, index) => {
                                        if (index === 3) {
                                            return <Avatar size={40}>...</Avatar>
                                        } else if (index <= 2) {
                                            return <Avatar size={30} key={index} src={user.avatar} />
                                        }
                                        return null
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </li>)
            }
            return null
        })
    }

    return (
        <>
            <DrawerHOC />
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Dashboard
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='title'>
                <h3>Dashboard</h3>
                <a href="https://github.com/longle1/NT114.O21.MMCL-DACN" target="_blank" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-light btn-git">
                        <i className="fab fa-github mr-2"></i>
                        <div>Github Repo</div>
                    </button>
                </a>
            </div>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {projectInfo?.members?.map((value, index) => {
                        return <div className="avatar">
                            <Avatar src={value.avatar} key={index} />
                        </div>
                    })}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
            <div className="content" style={{ display: 'flex' }}>
                <div className="card" style={{ width: '20rem', height: '30rem', overflow: 'auto', scrollbarWidth: 'none', fontWeight: 'bold' }}>
                    <div className="card-header">
                        BACKLOG {countEleStatus(0)}
                    </div>
                    <ul className="list-group list-group-flush">
                        {renderIssue(0)}
                    </ul>
                </div>
                <div className="card" style={{ width: '20rem', height: '30rem', overflow: 'auto', scrollbarWidth: 'none', fontWeight: 'bold' }}>
                    <div className="card-header">
                        SELECTED FOR DEVELOPMENT {countEleStatus(1)}
                    </div>
                    <ul className="list-group list-group-flush">
                        {renderIssue(1)}
                    </ul>
                </div>
                <div className="card" style={{ width: '20rem', height: '30rem', overflow: 'auto', scrollbarWidth: 'none', fontWeight: 'bold' }}>
                    <div className="card-header">
                        IN PROGRESS {countEleStatus(2)}
                    </div>
                    <ul className="list-group list-group-flush">
                        {renderIssue(2)}
                    </ul>
                </div>
                <div className="card" style={{ width: '20rem', height: '30rem', overflow: 'auto', scrollbarWidth: 'none', fontWeight: 'bold' }}>
                    <div className="card-header">
                        DONE {countEleStatus(3)}
                    </div>
                    <ul className="list-group list-group-flush">
                        {renderIssue(3)}
                    </ul>
                </div>
            </div>
        </>
    )
}
