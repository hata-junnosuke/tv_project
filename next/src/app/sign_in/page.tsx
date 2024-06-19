'use client'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        router.push('/')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  const handleGoogleAuth = (e) => {
    e.preventDefault()
    const form = document.createElement('form')
    form.method = 'GET'
    form.action = `http://localhost:3000/api/v1/auth/google_oauth2`
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign in
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="メールアドレス"
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </Button>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            const url =
              process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/google_oauth2'
            const headers = { 'Content-Type': 'application/json' }
            axios({ method: 'POST', url: url, headers: headers })
              .then((res: AxiosResponse) => {
                localStorage.setItem(
                  'access-token',
                  res.headers['access-token'],
                )
                localStorage.setItem('client', res.headers['client'])
                localStorage.setItem('uid', res.headers['uid'])
                router.push('/')
              })
              .catch((e: AxiosError<{ error: string }>) => {
                console.log(e.message)
              })
          }}
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          Googleログイン
        </Button>
        <button onClick={handleGoogleAuth}>Googleでログイン</button>
      </Container>
    </Box>
  )
}

export default SignIn
