'use client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const GoogleSignIn: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const status = urlParams.get('status')
    const uid = urlParams.get('uid')
    const token = urlParams.get('token')
    const client = urlParams.get('client')
    if (status === 'success' && uid && token && client) {
      localStorage.setItem('uid', uid)
      localStorage.setItem('access-token', token)
      localStorage.setItem('client', client)
      router.push('/')
    } else {
      router.push('/sign_in')
    }
  }, [router])

  return <></>
}

export default GoogleSignIn
