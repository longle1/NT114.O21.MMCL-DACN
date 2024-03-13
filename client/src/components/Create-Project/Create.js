import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getListCategories } from '../../redux/actions/CategoryAction';
import * as Yup from "yup";
import { createProjectAction } from '../../redux/actions/CreateProjectAction';
function Create(props) {
    const handlEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }
    const dispatch = useDispatch()
    const categoryList = useSelector(state => state.categories.categoryList)
    const {
        handleChange,
        handleSubmit,
        setFieldValue   //giúp set lại giá trị value mà không thông qua hàm handlechange
    } = props;

    useEffect(() => {
        dispatch(getListCategories())
    }, [])

    return (
        <div className='container'>
            <div className="header">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                        <li className="breadcrumb-item">Project</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Create Project
                        </li>
                    </ol>
                </nav>
            </div>
            <h3>Create Project</h3>
            <div className="info">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <p>Name</p>
                        <input onChange={handleChange} className='form-control' name='projectName' />
                    </div>
                    <div className='form-group'>
                        <p>Description</p>
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
                            onEditorChange={handlEditorChange}
                        />
                    </div>
                    <div className='form-group'>
                        <select name='categoryId' className='form-control' onChange={handleChange} >
                            {categoryList.map((value, index) => {
                                return <option value={value.id} key={index}>{value.name}</option>
                            })}
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary'>Create project</button>
                </form>
            </div>
        </div>
    )
}


const handleCreateProject = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return { projectName: '', description: '', categoryId: props.categoryList[0]?.id }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(createProjectAction(values))
    },

    displayName: 'EditForm',
})(Create);

const mapStateToProps = (state) => ({
    categoryList: state.categories.categoryList
})

export default connect(mapStateToProps)(handleCreateProject)