import Axios from "axios"
import { GET_LIST_PROJECT_API, GET_PROJECT_API } from "../constants/constant"

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
            const res = await Axios.get(`https://jira.dev/api/projectmanagement/${id}`)
            dispatch({
                type: GET_PROJECT_API,
                data: res.data.data
            })
        } catch (errors) {
            console.log("something went wrong", errors);
        }
    }
}