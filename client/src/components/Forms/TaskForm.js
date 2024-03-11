import { Editor } from '@tinymce/tinymce-react'
import { Input, InputNumber, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListPriority, getListType } from '../../redux/actions/TaskAction';
export default function TaskForm() {

    //su dung de lua chon nguoi tham vao 1 project
    const [value, setValue] = useState([]);

    //lay ra danh sach cac loai nhiem vu, loi cua task
    const listType = useSelector(state => state.listTask.listType)
    //lay ra danh sach muc do uu tien cua 1 task
    const listPriority = useSelector(state => state.listTask.listPriority)

    //theo doi thoi gian cua 1 task
    const [timeTracking, setTimeTracking] = useState({
        timeSpent: 0,
        timeRemaining: 0
    })

    const listProject = useSelector(state => state.listProject.listProject)

    console.log(listProject);

    useEffect(() => {
        dispatch(getListType())
        dispatch(getListPriority())
    }, [])
    const dispatch = useDispatch()
    return (
        <div className='container-fluid'>
            <form >
                <div className='row'>
                    <label>Project Name</label>
                    <Select
                        defaultValue="Select your project"
                        style={{ width: '100%' }}

                        options={listProject?.map((project, index) => {
                            return { label: project.projectName, value: project.id }
                        })}
                    />
                </div>
                <div className='row mt-2'>
                    <div className='col-6 p-0 pr-5'>
                        <label>Issue Type</label>
                        <Select
                            defaultValue="Select your issue"
                            style={{ width: '100%' }}
                            options={listType?.map((type, index) => {
                                return { label: type.typeName, value: type.typeId }
                            })}
                        />
                    </div>
                    <div className='col-6 p-0'>
                        <label>Priority</label>
                        <Select
                            defaultValue="Select your priority"
                            style={{ width: '100%' }}
                            options={listPriority?.map((priority, index) => {
                                return { label: priority.priorityName, value: priority.priorityId }
                            })}
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
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
                            options={[{ label: '1', value: 'long' }, { label: '2', value: 'duc' }, { label: '3', value: 'ngu' }]}
                            placeholder={'Select Item...'}
                            maxTagCount={'responsive'}
                            onSelect={(value, option) => {
                                console.log("value", value);
                                console.log("option", option);
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
