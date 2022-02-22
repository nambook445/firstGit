import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Desc() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <TextField
        id="outlined-multiline-static"
        name="description"
        label="Multiline"
        multiline
        rows={20}
        value={value}
        onChange={handleChange}
        sx={{width: '100%'}}
      />
    </Box>
  );
}
