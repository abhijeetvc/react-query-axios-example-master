import React,{useEffect} from 'react'
import { fetchAllOrganizations, fetchUsers } from './services/tutorials/tutorialservices';
import {useMutation} from 'react-query'
import apiClient from './http-common'

function Organisation(){

    const searchObj={
        page:0,
        size:10,
        searchString:'S'
    }

    const[searchOrg,setSearchOrg]=React.useState(searchObj)
    const[data,setData]=React.useState()

    //fetch all organisations
    useEffect(()=>{
       fetchAllOrganizations(searchOrg)
       .then(response=>response.data)
       .then(res=>{
          setData(res)
       })
    },[]) 

    const fortmatResponse = (res) => {
      return JSON.stringify(res, null, 2);
    };

    // filter data with search
    const { isLoading: isPostingTutorial, mutate: getFilteredData } = useMutation(
       () => fetchAllOrganizations(searchOrg)
     ,
      {
        onSuccess: (res) => {
          const response = {
            status:res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };
         console.log(response.data);

         // set response data
        setData(response.data);
        },
        onError: (err) => {
          setData(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isPostingTutorial) setData("Posting...");
    }, [isPostingTutorial]);
  
    const filterData=()=>{
      try{
        getFilteredData()
      }catch(err){
        setData(fortmatResponse(err))
      }
    }

      return(
        <div>
           <ul>
             {/* {
              orgData &&  orgData.map((org)=>(
                <li>{org.organizationName}</li>
               ))
             } */}
           </ul>
           <button type='button' onClick={filterData}>Search</button>
           
        </div>
      )
}

export default Organisation