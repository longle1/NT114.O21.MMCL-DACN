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

export const getItemCategory = (props) => {
    return dispatch => {
        dispatch({
            type: GET_ITEM_CATEGORY_DRAWER,
            props: props
        })
    }
}

export const updateItemCategory = (props) => {
    return async dispatch => {
        try {
            const res = await Axios.put(`http://localhost:4000/api/list/category/edit/${props.id}`, {props: props})

            if(res.data.status) {
                dispatch(ListProjectAction())
                dispatch(drawerAction(true))
            }
        }catch(error) {
            console.log("Error at http://localhost:4000/api/list/edit/category ", error);
        }
    }
}
export const deleteItemCategory = (id) => {
    return async dispatch => {
        try {
            const res = await Axios.delete(`http://localhost:4000/api/list/category/delete/${id}`)

            if(res.data.status) {
                dispatch(ListProjectAction())
                showNotificationWithIcon('success', 'Delete project', 'Successfully deleted this project')
            }
        }catch(error) {
            showNotificationWithIcon('error', 'Delete project', 'Failed deletion this project')
            console.log("Error at http://localhost:4000/api/list/category/delete ", error);
        }
    }
}