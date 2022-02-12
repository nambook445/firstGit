import * as React from 'react';
import Container from '@mui/material/Container';
import Nav from './component/Nav'
import CustomPaginationActionsTable from './component/Table/CustomPaginationActionsTable'
import SimplePaper from './component/Write/Write'


export default function App() {
  return (
    <Container>
      <Nav  />
      <CustomPaginationActionsTable  />
      <SimplePaper  />
    </Container>
  );
}
