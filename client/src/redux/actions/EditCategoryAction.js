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
            showNotificationWithIcon('success', 'Cập nhật dự án', 'Cập nhật thành công dự án')
        } catch (error) {

        }
    }
}
export const deleteItemCategory = (id) => {
    return async dispatch => {
        try {
            await Axios.delete(`https://jira.dev/api/projectmanagement/delete/${id}`)

            dispatch(ListProjectAction())
            showNotificationWithIcon('success', 'Xóa dự án', 'Xóa thành công dự án')
        } catch (error) {
            showNotificationWithIcon('error', 'Xóa dự án', 'Xóa dự án thất bại, vui lòng thử lại')
        }
    }
}