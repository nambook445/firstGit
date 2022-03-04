import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { values } from 'lodash';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// axios
import axios from 'axios'
// component
import Iconify from '../../../components/Iconify';
//----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(6, 'ID는 6자리 이상이어야 합니다.').max(20, 'Too Long!').required('ID is required'),
    password: Yup.string().min(6, '비밀번호는 6자리 이상이어야 합니다.').max(20, 'Too Long!').required('Password is required'),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('Password is required'),
    nickname: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('NickName is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordCheck: '',
      nickname: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (value) => {
      console.log(value);
      const data = {
        username: value.username,
        password: value.password,
        nickname: value.nickname
      };
      await axios
        .post('http://localhost:8080/resister', data, {
          withCredentials: true
        })
        .then((res) => sessionStorage.setItem('user', res.data.user.username))
        .then(navigate('/dashboard/app', { replace: true }))
        .catch((err) => console.log(err.response));
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="ID"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password Check"
            {...getFieldProps('passwordCheck')}
            error={Boolean(touched.passwordCheck && errors.passwordCheck)}
            helperText={touched.passwordCheck && errors.passwordCheck}
          />

          <TextField
            fullWidth
            autoComplete="nickname"
            type="text"
            label="NickName"
            {...getFieldProps('nickname')}
            error={Boolean(touched.nickname && errors.nickname)}
            helperText={touched.nickname && errors.nickname}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
