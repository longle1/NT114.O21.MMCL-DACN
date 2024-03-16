import { Avatar, Select } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import Parser from 'html-react-parser';
export default function InfoModal() {
    const issueInfo = useSelector(state => state.issue.issueInfo)
    const issueStatus = [
        { label: 'BACKLOG', value: 0 },
        { label: 'SELECTED FOR DEVELOPMENT', value: 1 },
        { label: 'IN PROGRESS', value: 2 },
        { label: 'DONE', value: 3 }
    ]

    const renderIssueStatus = (pos) => {
        return issueStatus.map((status) => {
            if (pos === status.value) {
                return <option key={status.value} selected value={status.value}>{status.label}</option>
            }
            return <option key={status.value} value={status.value}>{status.label}</option>
        })
    }
    const iTagForIssueTypes = (type) => {
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

    const iTagForPriorities = (priority) => {
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
    const priorityTypeOptions = [
        { label: <>{iTagForPriorities(0)} Highest</>, value: 0 },
        { label: <>{iTagForPriorities(1)} High</>, value: 1 },
        { label: <>{iTagForPriorities(2)} Medium</>, value: 2 },
        { label: <>{iTagForPriorities(3)} Low</>, value: 3 },
        { label: <>{iTagForPriorities(4)} Lowest</>, value: 4 }
    ]
    const issueTypeOptions = [
        { label: <>{iTagForIssueTypes(0)} Story</>, value: 0 },
        { label: <>{iTagForIssueTypes(1)} Task</>, value: 1 },
        { label: <>{iTagForIssueTypes(2)} Bug</>, value: 2 }
    ]
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <Select
                                placeholder={issueTypeOptions[issueInfo?.issueType]?.label}
                                defaultValue={issueTypeOptions[issueInfo?.issueType]?.value}
                                style={{ width: '100%' }}
                                options={issueTypeOptions}  
                                onSelect={(value, option) => {

                                }}
                                name="issueType"
                            />
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">{issueInfo?.shortSummary}</p>
                                    <div className="description">
                                        <p>Description</p>
                                        <p>
                                            {issueInfo?.description}
                                        </p>
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require('../../../assets/img/download (1).jfif')} alt />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require('../../../assets/img/download (1).jfif')} alt />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select">
                                            {renderIssueStatus(issueInfo?.issueStatus)}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                            {issueInfo?.assignees?.map((value, index) => {
                                                return <div style={{ display: 'flex', alignItems: 'center' }} className="item">
                                                    <div className="avatar">
                                                        <Avatar src={value.avatar} />
                                                    </div>
                                                    <p className="name d-flex align-items-center ml-1" style={{ fontWeight: 'bold' }}>
                                                        {value.username}
                                                        <i className="fa fa-times text-danger" style={{ marginLeft: 5 }} />
                                                    </p>
                                                </div>
                                            })}
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100px' }}>
                                                <p className='text-primary' style={{ fontSize: '12px', margin: '0px' }}><i className="fa fa-plus" style={{ marginRight: 5 }} />Add more</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <Avatar src={issueInfo?.creator.avatar} />
                                            </div>
                                            <p className="name d-flex align-items-center ml-1" style={{ fontWeight: 'bold' }}>
                                                {issueInfo?.creator.username}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <Select
                                            style={{ width: '100%' }}
                                            placeholder={priorityTypeOptions[issueInfo?.priority]?.label}
                                            defaultValue={priorityTypeOptions[issueInfo?.priority]?.value}
                                            options={priorityTypeOptions}
                                            onSelect={(value, option) => {

                                            }}
                                            name="priority"
                                        />
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="number" className="estimate-hours" disabled value={issueInfo?.timeOriginalEstimate} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" />
                                            <div style={{ width: '100%' }}>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">4h logged</p>
                                                    <p className="estimate-time">12h estimated</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
