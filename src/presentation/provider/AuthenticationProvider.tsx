/* eslint-disable @typescript-eslint/no-floating-promises */
import type React from 'react'
import { useEffect } from 'react'
import { useAuthenticationStore } from '../stores/authentication'
import { useNavigation } from '@react-navigation/native'
import { EAppStackRoutes } from '@/main/routes/mappers/EAppStackRoutes'
import { useObjectsStore } from '../stores/objects'

export const AuthenticationProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { user } = useAuthenticationStore()
  const { fetchObjects } = useObjectsStore()
  const { navigate } = useNavigation()

  useEffect(() => {
    if (user) {
      fetchObjects(user)
      navigate(EAppStackRoutes.BottomTabNavigation as never)
    } else {
      navigate(EAppStackRoutes.Authentication as never)
    }
  }, [user])
  return children
}
