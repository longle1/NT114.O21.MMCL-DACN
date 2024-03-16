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
            dispatch(GetProjectAction(props.projectId))
            showNotificationWithIcon('success', '', 'Tao thanh cong')
        } catch (error) {
            showNotificationWithIcon('error', '', 'Tao that bai')
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