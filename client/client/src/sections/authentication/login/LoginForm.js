import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Axios
import axios from 'axios';
// SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const MySwal = withReactContent(Swal);
  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required')
  // });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true
    },
    // validationSchema: LoginSchema,로그인 유효성 검사 텍스트
    onSubmit: async (value) => {
      const data = {
        username: value.username,
        password: value.password
      };
      await axios.post('http://localhost:8080/login',
        data, {
          withCredentials: true
        })
        .then((res) => sessionStorage.setItem('user', res.data.user.username))
        .then(
          MySwal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            timer: 1500,
            position: 'absolute',
            zIndex: 9999
          })
        .then(navigate('/dashboard/app', { replace: true })))
        .catch((err) =>
          MySwal.fire({
            icon: 'error',
            title: JSON.stringify(err.response.data.message),
            position: 'absolute',
            zIndex: 9999,
            footer: '<a href="/resister">회원가입</a>'
          })
        );
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/404" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
