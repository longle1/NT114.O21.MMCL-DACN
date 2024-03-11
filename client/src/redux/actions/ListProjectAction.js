import Axios from "axios"
import { GET_LIST_PROJECT_API } from "../constants/constant"

export const ListProjectAction = () => {
    return async dispatch => {
        try {
            const res = await Axios.get("http://localhost:4000/api/list")

            if (res.data.status) {
                dispatch({
                    type: GET_LIST_PROJECT_API,
                    data: res.data.data
                })
            } else {
                
            }
        } catch (errors) {

        }
    }
}