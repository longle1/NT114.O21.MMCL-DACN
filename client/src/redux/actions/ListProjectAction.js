import Axios from "axios"
import { DISPLAY_LOADING, GET_LIST_PROJECT_API, GET_PROJECT_API, HIDE_LOADING } from "../constants/constant"
import { delay } from "../../util/Delay"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const ListProjectAction = () => {
    return async dispatch => {
        try {
            const res = await Axios.get("https://jira.dev/api/projectmanagement/list")
            dispatch({
                type: GET_LIST_PROJECT_API,
                data: res.data.data
            })
        } catch (errors) {
            console.log("something went wrong", errors);
        }
    }
}

export const GetProjectAction = (id) => {
    return async dispatch => {
        try {
            dispatch({
                type: DISPLAY_LOADING
            })
            const res = await Axios.get(`https://jira.dev/api/projectmanagement/${id}`)
            dispatch({
                type: GET_PROJECT_API,
                data: res.data.data
            })
            await delay(1000)
            localStorage.setItem('projectid', id)
        } catch (errors) {
            localStorage.setItem('projectid', null)
        }
        dispatch({
            type: HIDE_LOADING
        })
    }
}