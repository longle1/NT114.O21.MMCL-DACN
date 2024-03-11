/* eslint-disable import/no-anonymous-default-export */

import { GET_ALL_PRIORITY_API, GET_ALL_TYPE_API } from "../constants/constant"

const initialState = {
    listType: [],
    listPriority: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TYPE_API:
            state.listType = action.data
            return { ...state }
        case GET_ALL_PRIORITY_API:
            state.listPriority = action.data
            return { ...state }

        default:
            return { ...state }
    }
}
