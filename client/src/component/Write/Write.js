import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

//sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



export default function SimplePaper() {
  const [hasError, setHasError] = React.useState(false)
  const [title, setTitle] = React.useState([]);
  const [description, setDescription] = React.useState([]);
    
      const onSubmit = (e) => {
        e.preventDefault();
        MySwal.fire({
          title: <p>작성하시겠습니까?</p>,
          showDenyButton: true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '수정',
          denyButtonText: '취소',
          footer: 'Copyright 2018',
        }).then((result) => {
          if(result.isConfirmed){
            let data ={
              title: title,
              description: description,
              user_id: 1
            };
            axios.post("http://localhost:8080/api", JSON.stringify(data), {
              headers: {
                "Content-Type": `application/json`
              },
              withCredentials: true
            }
          ).then(res=>console.log(res)).then(Swal.fire({
            position: 'absolute',
            icon: 'success',
            title: '작성완료',
            showConfirmButton: false,
            timer: 1500
          }).then(document.location = `/board`)
          ).catch(err => setHasError(true))
          }
        })

      }
     
      return (
    <form onSubmit={onSubmit}>
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
          m: 2, 
          display: 'flex',
          flexDirection: 'column',
          justifyContent:'flex-start',
          flexGrow: 3
          }}>
          <TextField id="outlined-basic" label="제목" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} variant="outlined" margin="normal" sx={{width: '100%'}} />

          <TextField
            id="outlined-multiline-static"
            name="description"
            label="본문"
            multiline
            rows={20}
            margin="normal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            sx={{width: '100%'}}
          />
          <Box sx={{
            display: 'flex',
            justifyContent:'center'
            }}>
            <Button type="submit" variant="contained">작성</Button>
          </Box>
        </Box>
      </Paper>
    </form>
  );
}
