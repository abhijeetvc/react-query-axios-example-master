import React, { useState, useEffect } from "react";
import { useQuery, useMutation ,refetchOnMount} from "react-query";
import apiClient from "./http-common";

function Testing(){

    const [getResult, setGetResult] = useState(null);

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      };
    
  const { isLoading: isLoadingTutorial, 
    refetch: getTutorialById } = useQuery(
    "query-tutorial-by-id",
    async () => {
      return await apiClient.get(`/users/1`);
    },
    {
     // refetchOnMount:false,
     // refetchOnWindowFocus:true,
      staleTime:0,
    //  enabled: false,
      retry: 1,
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res,
        };
     
       // setGetResult(fortmatResponse(result));
        console.log('hiiiii');
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorial){
        setGetResult("loading...");
        console.log('hellooooo');  
    } 
  }, [isLoadingTutorial]);

  //getTutorialById(1)

  return(
    <div>
        {getResult}
    </div>
  )
}

export default Testing