import React from 'react';
import Button from '@mui/material/Button';


const SecondaryButton = ({ name }: { name: string }) => {
  return (
    <Button
      className="bg-green-400 border hover:bg-blue-600 active:bg-blue-700 focus:border-blue-500 focus:ring focus:ring-blue-200"
      variant="contained"
      
    >
      {name}
    </Button>
  );
};


export default SecondaryButton;