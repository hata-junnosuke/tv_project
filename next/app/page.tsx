'use client'

import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from './utils'
import { useRouter } from 'next/navigation'

const Index: NextPage = () => {
  const router = useRouter()
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
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
  )
}

export default Index
