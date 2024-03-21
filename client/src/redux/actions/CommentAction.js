import Axios from "axios"
import { getInfoIssue } from "./IssueAction"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const createCommentAction = (props) => {
    return async dispatch => {
        try {
            await Axios.post("https://jira.dev/api/comments/create", props)

            dispatch(getInfoIssue(props.issueId))

            showNotificationWithIcon('success', 'Create Comment', 'Tao thanh cong 1 comment')
        } catch (error) {

        }
    }
}

export const updateCommentAction = (props) => {
    return async dispatch => {
        try {
            await Axios.put(`https://jira.dev/api/comments/update/${props.commentId}`, { content: props.content, timeStamp: props.timeStamp })

            dispatch(getInfoIssue(props.issueId))    

            showNotificationWithIcon('success', 'Update Comment', 'Sửa bình luận thành công')
        } catch (error) {
            showNotificationWithIcon('error', 'Update Comment', 'Sửa bình luận thất bại')
        }
    }
}
export const deleteCommentAction = (props) => {
    return async dispatch => {
        try {
            await Axios.delete(`https://jira.dev/api/comments/delete/${props.commentId}`)

            dispatch(getInfoIssue(props.issueId))    

            showNotificationWithIcon('success', 'Delete Comment', 'Xóa bình luận thành công')
        } catch (error) {
            showNotificationWithIcon('error', 'Delete Comment', 'Xóa bình luận thất bại')
        }
    }
}