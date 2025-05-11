import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './../../lib/supabase'
import Auth from '../../screens/LoginScreen'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Account from '../../screens/Account'

const HomeScreen = () => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

export default HomeScreen;