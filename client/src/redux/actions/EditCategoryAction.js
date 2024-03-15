import Axios from "axios"
import { GET_CATEGORY_TO_EDIT_DRAWER, GET_ITEM_CATEGORY_DRAWER } from "../constants/constant"
import { ListProjectAction } from "./ListProjectAction"
import { drawerAction } from "./DrawerAction"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const getCategory = (props) => {
    return dispatch => {
        dispatch({
            type: GET_CATEGORY_TO_EDIT_DRAWER,
            props: props
        })
    }
}
//lấy ra danh sách dự án hiện tại
export const getItemCategory = (props) => {
    return dispatch => {
        dispatch({
            type: GET_ITEM_CATEGORY_DRAWER,
            props: props
        })
    }
}

//cập nhật lại thông tin của project
export const updateItemCategory = (props) => {
    return async dispatch => {
        try {
            await Axios.put(`https://jira.dev/api/projectmanagement/update/${props.id}`, { props })

            dispatch(ListProjectAction())
            dispatch(drawerAction(true))
            showNotificationWithIcon('success', 'Update project', 'Successfully updated this project')
        } catch (error) {
            console.log("Error at `https://jira.dev/api/projectmanagement/update/ ", error);
        }
    }
}
export const deleteItemCategory = (id) => {
    return async dispatch => {
        try {
            await Axios.delete(`https://jira.dev/api/projectmanagement/delete/${id}`)

            dispatch(ListProjectAction())
            showNotificationWithIcon('success', 'Delete project', 'Successfully deleted this project')
        } catch (error) {
            showNotificationWithIcon('error', 'Delete project', 'delete failed project')
            console.log("Error at http://localhost:4000/api/list/category/delete ", error);
        }
    }
}