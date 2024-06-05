'use client'

import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from './utils'
import { useSession, signIn, signOut } from 'next-auth/react'

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)
  const { data: session } = useSession()

  if (error) return <div>Railsが応答してません</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button onClick={() => signIn()}>ログイン</button>
          </div>
        )
      }
    </>
  )
}

export default Index
