import { Editor } from '@tinymce/tinymce-react'
import { Input, InputNumber, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProjectAction } from '../../redux/actions/ListProjectAction';
import { withFormik } from 'formik';
import { createIssue } from '../../redux/actions/IssueAction';
import { submit_edit_form_action } from '../../redux/actions/DrawerAction';
function TaskForm(props) {
    //theo doi thoi gian cua 1 task
    const [timeTracking, setTimeTracking] = useState({
        timeSpent: 0,
        timeRemaining: 0
    })

    const handlEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    const issueTypeOptions = [
        { label: "Story", value: 0 },
        { label: "Task", value: 1 },
        { label: "Bug", value: 2 }
    ]
    const priorityTypeOptions = [
        { label: "Highest", value: 0 },
        { label: "High", value: 1 },
        { label: "Medium", value: 2 },
        { label: "Low", value: 3 },
        { label: "Lowest", value: 4 }
    ]
    const { handleChange, handleSubmit, setFieldValue } = props
    const { id } = useParams()

    useEffect(() => {
        if (id !== undefined) {
            //thiet lap id project cho withformik
            setFieldValue('projectId', id)
            dispatch(GetProjectAction(id))
            // //submit sự kiện để gửi lên form
            dispatch(submit_edit_form_action(handleSubmit))
        }
    }, [])
    const dispatch = useDispatch()
    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label>Project Name</label>
                    <Input value={props.projectInfo?.nameProject} disabled />
                </div>
                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-5'>
                        <label>Issue Type</label>
                        <Select
                            defaultValue="Select your issue"
                            style={{ width: '100%' }}
                            options={issueTypeOptions}
                            onSelect={(value, option) => {
                                setFieldValue('issueType', value)
                            }}
                            name="issueType"
                        />
                    </div>
                    <div className='col-6 p-0'>
                        <label>Priority</label>
                        <Select
                            defaultValue="Select your priority"
                            style={{ width: '100%' }}
                            options={priorityTypeOptions}
                            onSelect={(value, option) => {
                                setFieldValue('priority', value)
                            }}
                            name="priority"
                        />
                    </div>
                </div>

                <div className='row mt-2'>
                    <label>Short summary</label>
                    <Input placeholder="Input content" onChange={handleChange} name="shortSummary" />
                </div>

                <div className='row mt-2 d-flex flex-column'>
                    <label>Description</label>
                    <Editor name='description'
                        apiKey='golyll15gk3kpiy6p2fkqowoismjya59a44ly52bt1pf82oe'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        onEditorChange={handlEditorChange}
                    />
                </div>
                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-4'>
                        <label>Assignees</label>
                        <Select mode={'multiple'}
                            style={{ width: '100%' }}
                            options={props.projectInfo?.members?.map(value => {
                                return { label: value.username, value: value._id }
                            })}
                            placeholder={'Select Item...'}
                            maxTagCount={'responsive'}
                            onChange={(value) => {
                                setFieldValue('assignees', value)
                            }}
                            name="assignees"
                        />
                    </div>
                    <div className='col-6 p-0'>
                        <label>Time Tracking</label>
                        <Slider defaultValue={0} value={timeTracking.timeSpent} max={timeTracking.timeRemaining + timeTracking.timeSpent} />
                        <div className='row'>
                            <span className='col-6 text-left'>{timeTracking.timeRemaining} logged</span>
                            <span className='col-6 text-right'>{timeTracking.timeRemaining} remaining</span>
                        </div>
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-4'>
                        <label>Original Estimate (Hours)</label>
                        <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} onChange={(value) => {
                            setFieldValue('timeOriginalEstimate', value)
                        }} name="timeOriginalEstimate" />
                    </div>
                    <div className='col-6 p-0'>
                        <div className='row'>
                            <div className='col-6  pr-4'>
                                <label>Time spent</label>
                                <InputNumber value={timeTracking.timeSpent} name="timeSpent" min={0} defaultValue={0} onChange={(value) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeSpent: value
                                    })

                                    setFieldValue('timeSpent', timeTracking.timeSpent)
                                }} />
                            </div>
                            <div className='col-6 p-0'>
                                <label>Time remaining</label>
                                <InputNumber value={timeTracking.timeRemaining} min={0} defaultValue={0} name="timeRemaining" onChange={(value) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeRemaining: value
                                    })

                                    setFieldValue('timeRemaining', timeTracking.timeRemaining)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
const handleSubmitTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectId: props.projectInfo?._id,
            creator: props.userInfo?.id,
            issueType: 0,
            priority: 0,
            shortSummary: '',
            description: '',
            assignees: [],
            timeOriginalEstimate: 0,
            timeSpent: 0,
            timeRemaining: 0,
            issueStatus: 0,  //khoi tao mac dinh se vao backlog
            comments: [],
            positionList: 0 //thu tu nam trong danh sach
        }
    },
    // validationSchema: Yup.object().shape({

    // }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(createIssue(values))
    },

    displayName: 'BasicForm',
})(TaskForm);

const mapStateToProp = (state) => ({
    projectInfo: state.listProject.projectInfo,
    userInfo: state.user.userInfo
})

export default connect(mapStateToProp)(handleSubmitTaskForm)