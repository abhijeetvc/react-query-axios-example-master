import * as React from 'react';

import Button from '@mui/material/Button';

import MyModal from './MyModal'



export default function New() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
     {open?<MyModal open={open} handleCloseCheck={handleClose}/>:""}
      
    </div>
  );
}

