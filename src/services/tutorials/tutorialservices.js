import apiClient from '../../http-common'

export const fetchUsers=async(searchOrgObj)=>{
   console.log(searchOrgObj);
   return await apiClient.post("/tutorials",searchOrgObj)
}

export const fetchAllOrganizations=async(searchOrgObj)=>{
    console.log(searchOrgObj);
    return await apiClient.post("/organizations/organizationlist",searchOrgObj)
}
