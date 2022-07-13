import apiClient from '../../http-common'

export const fetchAllTutorials=async()=>{
    return await apiClient.get("/users")
}

