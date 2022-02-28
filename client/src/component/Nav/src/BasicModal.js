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

// .my-swal {
//   position: absolute;
//   z-index: 99999!important;
// }

// .then(res => {Swal.fire({
//   icon: 'success',
//   title: 'Your work has been saved',
//   showConfirmButton: false,
//   timer: 1500
// })})


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [loginStatus, setLoginStatus] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[2].value
    }
    axios.post("http://localhost:8080/login",data,{
      withCredentials: true
    }).then(res => console.log(res)).then(res => {
        MySwal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
        didClose:handleClose(),
        position: 'absolute',
        zIndex:9999
        }).then(setLoginStatus(true)).then(console.log(loginStatus))
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
  // React.useEffect(()=>{
  //   console.log(loginStatus)
  // },[loginStatus])


  function LoginButton(){
    return (<Button onClick={handleOpen} sx={{color:'white'}}>LOGIN</Button>);
  }
  function LogoutButton(){
    return (<Button onClick={handleOpen} sx={{color:'white'}}>LOGOUT</Button>);
  }

//   const LoginStat = React.useEffect(() => {
//    console.log(loginStatus)
//     if(!loginStatus){
//       return <Button onClick={handleOpen} sx={{color:'white'}} value="LOGIN" />
//     }else{
//       return <Button onClick={handleOpen} sx={{color:'white'}} value="LOGOUT" />
//     }
//  }, [loginStatus])
  function LoginStat(props){
    if(!props.loginStatus){
      return <LoginButton/>
    }else{
      return <LogoutButton/>
    }
  }
 

  

  return (
    <span>
      <LoginStat loginStatus={loginStatus} />
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
            sx={{mb:'1rem',
          }}
          />
          <TextField
            onChange={e=>e.target.value}
            required  
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{mb:'1rem',
          }}
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