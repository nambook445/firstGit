import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Title from './Title';
import Desc from './Desc';
import BasicButtons from './Buttton';


export default function SimplePaper() {
  return (
    <form>
      <Paper elevation={3} 
        sx={{
          display: 'flex',
          flexBasise: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          hight: '100vh'

        }}
      >
        <Box sx={{
          m: 1, 
          display: 'flex',
          flexDirection: 'column',
          margin: 2,
          justifyContent:'flex-start',
          flexGrow: 3
          }}>
          <Title />
          <Desc />
          <BasicButtons />
        </Box>
      </Paper>
    </form>
  );
}
