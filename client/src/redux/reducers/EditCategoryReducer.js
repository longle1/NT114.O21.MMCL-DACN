import { GET_CATEGORY_TO_EDIT_DRAWER, GET_ITEM_CATEGORY_DRAWER } from "../constants/constant"
/* eslint-disable import/no-anonymous-default-export */

const initialState = {
    list: {
        id: 1,
        projectName: "default",
        description: "<h3>cap nhat moi</h3>",
        categoryId: 2,
        creator: {userId: 0, userName: ''},
        members: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_CATEGORY_TO_EDIT_DRAWER:
            return { ...state }
        case GET_ITEM_CATEGORY_DRAWER:
            let newState = action.props
            state.list = {...newState}

            return {...state}

        default:
            return state
    }
}
