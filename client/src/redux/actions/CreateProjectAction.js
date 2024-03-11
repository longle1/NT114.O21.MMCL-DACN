import Axios from "axios"

export const createProjectAction = (data) => {
    return async dispatch => {
        try {
            const res = await Axios.post("http://localhost:4000/api/create", { data })

            if (res.data.status) {
                alert("successfully created")
            } else {
                alert("successfully failed")
            }
        }catch(errors) {
            
        }
    }
}