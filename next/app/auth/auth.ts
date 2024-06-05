import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('Google Sign-In')
      console.log('Profile:', profile)
      console.log('Account:', account)
      return true // この後RailsでUserに登録する処理を書く
    },
  },
})
