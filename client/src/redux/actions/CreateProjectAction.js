import Axios from "axios"

export const createProjectAction = (data) => {
    return async dispatch => {
        try {
            await Axios.post("https://jira.dev/api/projectmanagement/create", data)

            alert("successfully created")
        }catch(errors) {
            alert("failed created")
        }
    }
}