import React from 'react'
import DrawerHOC from '../../HOC/DrawerHOC'
import { useParams } from 'react-router-dom';
export default function Dashboard() {
    const { id } = useParams()
    return (
        <>
            <DrawerHOC />
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item">CyberLearn</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Dashboard
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='title'>
                <h3>Dashboard</h3>
                <a href="https://github.com/oldboyxx/jira_clone" target="_blank" style={{ textDecoration: 'none' }}>
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
                    <div className="avatar">
                        <img src="./assets/img/download (1).jfif" alt="1" />
                    </div>
                    <div className="avatar">
                        <img src="./assets/img/download (2).jfif" alt="1" />
                    </div>
                    <div className="avatar">
                        <img src="./assets/img/download (3).jfif" alt="1" />
                    </div>
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
            <div className="content" style={{ display: 'flex' }}>
                <div className="card" style={{ width: '17rem', height: '25rem' }}>
                    <div className="card-header">
                        BACKLOG 3
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                            <p>
                                Each issue has a single reporter but can have multiple
                                assignees
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    <i className="fa fa-bookmark" />
                                    <i className="fa fa-arrow-up" />
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        <div className="avatar">
                                            <img src="./assets/img/download (1).jfif" alt="1" />
                                        </div>
                                        <div className="avatar">
                                            <img src="./assets/img/download (2).jfif" alt="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <p>
                                Each issue has a single reporter but can have multiple
                                assignees
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    <i className="fa fa-check-square" />
                                    <i className="fa fa-arrow-up" />
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        <div className="avatar">
                                            <img src="./assets/img/download (1).jfif" alt="1" />
                                        </div>
                                        <div className="avatar">
                                            <img src="./assets/img/download (2).jfif" alt="1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
                <div className="card" style={{ width: '17rem', height: '25rem' }}>
                    <div className="card-header">
                        SELECTED FOR DEVELOPMENT 2
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                    </ul>
                </div>
                <div className="card" style={{ width: '17rem', height: '25rem' }}>
                    <div className="card-header">
                        IN PROGRESS 2
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                    </ul>
                </div>
                <div className="card" style={{ width: '17rem', height: '25rem' }}>
                    <div className="card-header">
                        DONE 3
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
