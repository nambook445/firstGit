import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Title() {
  return (
    <Box sx={{mb: 2}}>
      <TextField id="outlined-basic" name="title" label="Outlined" variant="outlined" sx={{width: '100%'}} />
    </Box>
  );
}
