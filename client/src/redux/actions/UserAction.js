import Axios from "axios"
import { GET_USER_BY_KEYWORD_API, USER_LOGGED_IN } from "../constants/constant"
import { ListProjectAction } from "./ListProjectAction"
import { showNotificationWithIcon } from "../../util/NotificationUtil"

export const getUserKeyword = (keyword) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`http://localhost:4000/api/users/getUser?keyword=${keyword}`)

            if (res.data.status) {
                dispatch({
                    type: GET_USER_BY_KEYWORD_API,
                    list: res.data.data
                })
            }
        } catch (error) {

        }
    }
}

export const insertUserIntoProject = (props) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`http://localhost:4000/api/users/insertUser`, { props })

            if (res.data.status) {
                if (!res.data.exist) {
                    dispatch(ListProjectAction(res.data.data))
                    showNotificationWithIcon('success', 'Insert user', 'Successfully inserted in this project')
                } else {
                    showNotificationWithIcon('error', 'Insert user', 'User already in this project')
                }
            }
        } catch (error) {

        }
    }
}

export const signUpUserAction = (props) => {
    return async dispatch => {
        try {
            const newUser = {
                username: props.username,
                email: props.email,
                password: props.password
            }
            const res = await Axios.post("https://jira.dev/api/users/signup", newUser)

            if (res.status === 201) {
                showNotificationWithIcon("success", "Register", "Successfully created the user")
            }
        } catch (error) {
            showNotificationWithIcon("error", "Register", error.response.data.message)
        }
    }
}


export const userLoginAction = (email, password) => {

    return async (dispatch) => {
        try {
            let loggedIn = false
            await Axios.post('https://jira.dev/api/users/login', {
                email,
                password
            })
                .then(res => {
                    showNotificationWithIcon("success", "Login", "Logged in success")
                    loggedIn = true
                })
                .catch(err => {
                    showNotificationWithIcon("error", "Login", "Logged in failed")
                })

            if (loggedIn) {
                const res = await Axios.get('https://jira.dev/api/users/currentuser')

                console.log(res);

                if (res.data.currentUser) {
                    dispatch({
                        type: USER_LOGGED_IN,
                        status: true
                    })
                }
            }
        } catch (errors) {
            showNotificationWithIcon("error", "Login", "Logged in failed")
        }
    }
}

export const userLoggedInAction = () => {
    return async dispatch => {
        const res = await Axios.get('https://jira.dev/api/users/currentuser')

        if (!res.data.currentUser) {
            dispatch({
                type: USER_LOGGED_IN,
                status: false
            })
        } else {
            dispatch({
                type: USER_LOGGED_IN,
                status: true
            })
        }
    }
}

export const userLoggedoutAction = () => {
    return async dispatch => {
        await Axios.post('https://jira.dev/api/users/logout')
            .then(res => {
                showNotificationWithIcon('success', 'Logout', 'You are logged out')
                dispatch({
                    type: USER_LOGGED_IN,
                    status: false
                })
            })
            .catch(err => {
                console.log("Something went wrong");
            })
    }
}