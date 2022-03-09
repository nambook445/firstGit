import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Typography,
  Input,
  Button,
  Stack,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@mui/material';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { styled } from '@mui/material/styles';
// axios
import axios from 'axios';

// ----------------------------------------------------------------------
// //

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [
      'link' //'image'
    ],
    [{ align: [] }, { color: [] }, { background: [] }]
  ]
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  // 'image',
  'align',
  'color',
  'background'
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PaperPage() {
  const [desc, setdesc] = useState('');
  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const Input = styled('input')({
    display: 'none'
  });
  // SweetAlert2
  const MySwal = withReactContent(Swal);
  function handleOnChange(value) {
    setdesc(value);
  }

  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    let data = new FormData();
    data.append('post_image', imgFile);
    data.set('title', e.target[0].value);
    data.set('description', desc);

    await axios
      .post('http://localhost:8080/api/topic', data, {
        withCredentials: true
      })
      .then((res) => {
        MySwal.fire({
          icon: 'success',
          title: '작성완료',
          showConfirmButton: false,
          timer: 1500
        }).then((document.location = 'http://localhost:3000/dashboard/blog'));
      })
      .catch(
        (err) => console.log(err.response)
        // MySwal.fire({
        //   icon: 'error',
        //   title: JSON.stringify(err.response)
        // })
      );
  };

  return (
    <Page title="Dashboard: Paper | Minimal-UI">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Paper
        </Typography>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            //multiple 일단은 싱글 이미지만 구현해보자
            type="file"
            onChange={handleChangeFile}
          />
          <Button variant="contained" component="span" startIcon={<Iconify icon="eva:plus-fill" />}>
            Image
          </Button>
        </label>
      </Stack>
      <Stack>
        <Card sx={{ minWidth: 345 }}>
          <form onSubmit={handleSubmit}>
            <CardMedia component="img" height="140" src={imgBase64} alt="green iguana" />
            <CardContent>
              <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                size="small"
                margin="normal"
                fullWidth
                color="grey"
              />

              <ReactQuill
                style={{ height: '600px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={desc}
                onChange={handleOnChange}
              />
            </CardContent>
            <CardActions>
              <Button fullWidth size="small" type="submit" variant="contained">
                확인
              </Button>
            </CardActions>
          </form>
        </Card>
      </Stack>
    </Page>
  );
}
