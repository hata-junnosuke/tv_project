import axios from 'axios'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      const provider = account?.provider
      const name = profile?.name
      const email = profile?.email
      console.log('signIn', provider, name, email)
      try {
        return true
        const response = await axios.post(
          `${apiUrl}/api/v1/auth/${provider}/callback`,
          {
            name,
            email,
          },
        )

        if (response.status === 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('サインインでエラーが発生しました', error)
        return false
      }
    },
  },
})
