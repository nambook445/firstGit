import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function BasicButtons() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent:'center'
      }}>
      <Button type="submit" variant="contained">확인</Button>
      <Button variant="contained">취소</Button>
    </Box>
  );
}
