import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BasicButtons() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent:'center'
      }}>
      <Button variant="contained">확인</Button>
      <Button variant="contained">취소</Button>
    </Box>
  );
}
