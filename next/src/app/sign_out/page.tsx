'use client'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SignOut: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    localStorage.clear()
    router.push('/sign_in')
  }, [router])

  return <></>
}

export default SignOut
