import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react";
import { useQuery, useMutation ,refetchOnMount} from "react-query";

import apiClient from "./http-common";
function MyModal(props){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
       
        staleTime:0,
        cacheTime:0,
        retry: 1,
        onSuccess: (res) => {
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res,
          };
       
          setGetResult(fortmatResponse(result));
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


    return(
<>

<Modal
        open={props.open}
        onClose={props.handleCloseCheck}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {getResult}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

     
      </>
    )
}

export default MyModal