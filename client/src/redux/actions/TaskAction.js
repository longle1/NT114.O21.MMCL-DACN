import Axios from 'axios'
import { GET_ALL_PRIORITY_API, GET_ALL_TYPE_API } from '../constants/constant'
export const getListType = () => {
    return async dispatch => {
        try {
            const res = await Axios.get("http://localhost:4000/api/getAllTypes")

            if (res.data.status) {
                dispatch({
                    type: GET_ALL_TYPE_API,
                    data: res.data.data
                })
            }
        } catch (err) {
            console.log("http://localhost:4000/api/getAllTypes ", "thất bại");
        }
    }
}
export const getListPriority = () => {
    return async dispatch => {
        try {
            const res = await Axios.get("http://localhost:4000/api/getAllPriorities")

            if (res.data.status) {
                dispatch({
                    type: GET_ALL_PRIORITY_API,
                    data: res.data.data
                })
            }
        } catch (err) {
            console.log("http://localhost:4000/api/getAllPriorities ", "thất bại");
        }
    }
}
