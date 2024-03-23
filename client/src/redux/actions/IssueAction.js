import Axios from "axios"
import { showNotificationWithIcon } from "../../util/NotificationUtil"
import { GET_INFO_ISSUE } from "../constants/constant"
import { GetProjectAction } from "./ListProjectAction"

export const createIssue = (props) => {
    return async dispatch => {
        try {
            const res = await Axios.post('https://jira.dev/api/issue/create', props)

            //sau khi tao thanh cong issue thi tien hanh cap nhat lai danh sach project
            await Axios.put('https://jira.dev/api/projectmanagement/insert/issue', { project_id: props.projectId, issue_id: res.data?.data._id })

            //cap nhat lai thong tin ve project
            dispatch(GetProjectAction(props.projectId, ""))
            showNotificationWithIcon('success', 'Tạo mới', 'Tạo thành công vấn đề')
        } catch (error) {
            showNotificationWithIcon('error', 'Tạo mới', 'Tạo mới thất bại')
        }
    }
}

export const getInfoIssue = (id) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`https://jira.dev/api/issue/${id}`)
            dispatch({
                type: GET_INFO_ISSUE,
                issueInfo: res.data.data
            })
        } catch (error) {
            console.log("error in getInfoIssue action", error);
        }
    }
}


export const updateInfoIssue = (issueId, projectId, props) => {
    return async dispatch => {
        try {
            await Axios.put(`https://jira.dev/api/issue/update/${issueId}`, { ...props })

            //lấy ra danh sách issue sau khi thay đổi
            dispatch(getInfoIssue(issueId))

            //cap nhat lai danh sach project
            dispatch(GetProjectAction(projectId, ""))

            showNotificationWithIcon("success", "Cập nhật", "Cập nhật vấn đề thành công")


        } catch (error) {
            console.log("error in updateInfoIssue action", error);
        }
    }
}

export const deleteAssignee = (issueId, projectId, userId) => {
    return async dispatch => {
        try {
            await Axios.put(`https://jira.dev/api/issue/delete/assignee/${issueId}`, { userId })
            //lấy ra danh sách issue sau khi thay đổi
            dispatch(getInfoIssue(issueId))

            //cap nhat lai danh sach project
            dispatch(GetProjectAction(projectId, ""))

            showNotificationWithIcon("success", "Xóa", "Xóa thành công người dùng khỏi dự án")


        } catch (error) {
            console.log("error in deleteAssignee action", error);
        }
    }
}

export const deleteIssue = (issueId) => {
    return async dispatch => {
        try {
            await Axios.delete(`https://jira.dev/api/issue/delete/${issueId}`)
            //lấy ra danh sách issue sau khi thay đổi
            dispatch(getInfoIssue(issueId))

            showNotificationWithIcon("success", "Delete", "Successfully deleted this issue")


        } catch (error) {
            console.log("error in deleteAssignee action", error);
        }
    }
}