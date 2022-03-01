import * as React from 'react';
import Container from '@mui/material/Container';
import Nav from './component/Nav/Nav';
import CollapsibleTable from './component/Table/CollapsibleTable';
import SimplePaper from './component/Write/Write';
import { BrowserRouter, Route, Routes} from 'react-router-dom';



export default function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() =>{
    if(sessionStorage.getItem('user') === null){
      console.log('로그인 상태가 아닙니다.')
    } else {
      setIsLogin(true);
      console.log(`${sessionStorage.getItem('user')}님이 로그인하였습니다.`)
    }
  })
  return (
    <BrowserRouter>
      <Container>
        <Nav isLogin={isLogin} />
        <Routes>
          <Route path="/board/" element={<CollapsibleTable/>}></Route>
          <Route path="/pages/" element={<SimplePaper/>}></Route>  
        </Routes>
      </Container>
    </BrowserRouter>  
  );
}
