import { Editor } from '@tinymce/tinymce-react'
import { Input, InputNumber, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProjectAction } from '../../redux/actions/ListProjectAction';
import { showNotificationWithIcon } from '../../util/NotificationUtil';
import { withFormik } from 'formik';
function TaskForm() {


    //lay ra thong tin ve project
    const projectInfo = useSelector(state => state.listProject.projectInfo)

    //theo doi thoi gian cua 1 task
    const [timeTracking, setTimeTracking] = useState({
        timeSpent: 0,
        timeRemaining: 0
    })

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

    const { id } = useParams()

    useEffect(() => {
        if (id !== undefined) {
            dispatch(GetProjectAction(id))
        }
    }, [])
    const dispatch = useDispatch()
    return (
        <div className='container-fluid'>
            <form >
                <div className='row'>
                    <label>Project Name</label>
                    <Input value={projectInfo?.nameProject} disabled />
                </div>
                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-5'>
                        <label>Issue Type</label>
                        <Select
                            defaultValue="Select your issue"
                            style={{ width: '100%' }}
                            options={issueTypeOptions}
                        />
                    </div>
                    <div className='col-6 p-0'>
                        <label>Priority</label>
                        <Select
                            defaultValue="Select your priority"
                            style={{ width: '100%' }}
                            options={priorityTypeOptions}
                        />
                    </div>
                </div>

                <div className='row mt-2'>
                    <label>Short summary</label>
                    <Input placeholder="Input content" />
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
                    // onEditorChange={handlEditorChange}
                    />
                </div>
                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-4'>
                        <label>Assignees</label>
                        <Select mode={'multiple'}
                            style={{ width: '100%' }}
                            options={projectInfo?.members?.map(value => {
                                return { label: value.username, value: value._id }
                            })}
                            defaultValue="Select assignees"
                            placeholder={'Select Item...'}
                            maxTagCount={'responsive'}
                            onChange={(value) => {
                                console.log("value", value);
                            }}
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
                        <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
                    </div>
                    <div className='col-6 p-0'>
                        <div className='row'>
                            <div className='col-6  pr-4'>
                                <label>Time spent</label>
                                <InputNumber value={timeTracking.timeSpent} min={0} defaultValue={0} onChange={(value) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeSpent: value
                                    })
                                }} />
                            </div>
                            <div className='col-6 p-0'>
                                <label>Time remaining</label>
                                <InputNumber min={0} defaultValue={0} onChange={(value) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeRemaining: value
                                    })
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
const handleSubmitForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.list?._id,
            nameProject: props.list?.nameProject,
            description: props.list?.description,
            category: props.list?.category?._id,
        }
    },
    // validationSchema: Yup.object().shape({

    // }),
    handleSubmit: (values, { props, setSubmitting }) => {

    },

    displayName: 'BasicForm',
})(TaskForm);

const mapStateToProps = (state) => ({
    list: state.editCategory.list
})

export default connect(mapStateToProps)(handleSubmitForm)