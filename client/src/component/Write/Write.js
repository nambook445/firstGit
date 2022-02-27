import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';





export default function SimplePaper() {
  const [hasError, setHasError] = React.useState(false)
  const [title, setTitle] = React.useState([]);
  const [description, setDescription] = React.useState([]);


      const onSubmit = (e) => {
        e.preventDefault();
        let data ={
          title: title,
          description: description,
          user_id: 1
        };
        axios.post("http://localhost:8080/api", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`
          }
        }
      ).then(res => console.log(res)).catch(err => setHasError(true))}
    
     
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
            <Button type="submit" variant="contained">확인</Button>
          </Box>
        </Box>
      </Paper>
    </form>
  );
}
