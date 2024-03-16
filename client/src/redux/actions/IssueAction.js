import Axios from "axios"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const createIssue = (props) => {
    return async dispatch => {
        try {
            await Axios.post('https://jira.dev/api/issue/create', props)
            showNotificationWithIcon('success', '', 'Tao thanh cong')
        } catch (error) {
            showNotificationWithIcon('error', '', 'Tao that bai')
        }
    }
}