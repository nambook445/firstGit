import * as React from 'react';
import Container from '@mui/material/Container';
import Nav from './component/Nav';
import CollapsibleTable from './component/Table/CollapsibleTable';
import SimplePaper from './component/Write/Write';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios'



export default function App() { 
  return (
    <BrowserRouter>
      <Container>
        <Nav/>
        <Routes>
          <Route path="/board/" element={<CollapsibleTable/>}></Route>
          <Route path="/pages" element={<SimplePaper/>}></Route>  
        </Routes>
      </Container>
    </BrowserRouter>  
  );
}
