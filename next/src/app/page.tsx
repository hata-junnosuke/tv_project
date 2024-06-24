'use client'

import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from './utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Index: NextPage = () => {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/health_check'
  const { data, error } = useSWR(url, fetcher)

  const [user, setUser] = useState(null as userType | null)

  type userType = {
    id: number
    name: string
    email: string
  }

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      const current_user_url =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'
      axios
        .get(current_user_url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res) => {
          setUser(res.data)
        })
    }
  }, [])

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {user ? (
        <>
          <div>Rails疎通確認</div>
          <div>レスポンスメッセージ: {data?.message}</div>
          <div>ユーザー情報</div>
          <div>名前: {user.name}</div>
          <div>メールアドレス: {user.email}</div>
          {/* サインアウトのボタン */}
          <button
            onClick={() => {
              localStorage.clear()
              router.push('/sign_out')
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <div>ログインしていません</div>
          <button
            onClick={() => {
              router.push('/sign_in')
            }}
          >
            Sign in
          </button>
        </>
      )}
    </>
  )
}

export default Index
