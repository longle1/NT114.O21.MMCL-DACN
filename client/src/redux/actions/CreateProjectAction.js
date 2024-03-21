import Axios from "axios"
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/constant"
import { delay } from "../../util/Delay"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const createProjectAction = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            })

            await delay(2000)
            await Axios.post("https://jira.dev/api/projectmanagement/create", data)
            showNotificationWithIcon('success', 'Tạo dự án', 'Khởi tạo dự án thành công')
            dispatch({
                type: HIDE_LOADING
            })
        }catch(errors) {
            showNotificationWithIcon('error', 'Tạo dự án', 'Khởi tạo dự án thất bại')
        }
    }
}