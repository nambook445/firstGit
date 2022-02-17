import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Title from './src/Title';
import Desc from './src/Desc';
import BasicButtons from './src/Buttton';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
