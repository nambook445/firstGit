import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  zIndex: 1
}

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const isLogin = props.isLogin;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[2].value
    }
    await axios.post("http://localhost:8080/login",data,{
      withCredentials: true
    }).then(res => sessionStorage.setItem('user', res.data.user.username )).then(res => {
        MySwal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        didClose:handleClose(),
        position: 'absolute',
        zIndex:9999
        }).then(document.location = '/')
    }).catch(err => 
      {MySwal.fire({
        icon: 'error',
        title: JSON.stringify(err.response.data.message),
        position: 'absolute',
        zIndex:9999,
        footer: '<a href="/resister">회원가입</a>'
      })
    })
  }

  async function onLogout(){
    sessionStorage.removeItem('user');
    document.location = '/';
    await axios.get('http://localhost:8080/logout',{ withCredentials : true }).then(res => console.log(res)).catch(err => console.log(err.response))
  }
  
  function LoginButton(){
    return (<Button onClick={handleOpen} sx={{color:'white'}}>LOGIN</Button>);
  }
  function LogoutButton(){
    return (<Button onClick={onLogout} sx={{color:'white'}}>LOGOUT</Button>);
  }
  function LoginStat(props){
    if(!props.isLogin){
      return <LoginButton />
    }else{
      return <LogoutButton />
    }
  }

  return (
    <span>
      <LoginStat isLogin={isLogin} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{position: 'absolute', zIndex: 1}}
      >
        <Box sx={style}>  
        <Typography>LOGIN</Typography>
        <form onSubmit={handleSubmit} sx={{ position:'relative', zIndex:1}}>
          <TextField
            onChange={e=>e.target.value}
            required
            id="outlined-required"
            label="ID"
            sx={{mb:'1rem'}}
          />
          <TextField
            onChange={e=>e.target.value}
            required  
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{mb:'1rem'}}
          />
          <div>
            <Button type="submit"sx={{position:'relative'}}>LOGIN</Button>
          </div>
        </form>
        </Box>
      </Modal>
    </span>
  );
}
