import * as React from 'react';
import Container from '@mui/material/Container';
import Nav from './component/Nav'
import CollapsibleTable from './component/Table/CollapsibleTable'
import SimplePaper from './component/Write/Write'


export default function App() {
  return (
    <Container>
      <Nav  />
      <CollapsibleTable  />
      <SimplePaper  />
    </Container>
  );
}
