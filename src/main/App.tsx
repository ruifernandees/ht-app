import React from 'react'
import { MainRouteCollection } from './routes/main.routes'

// eslint-disable-next-line no-undef
if (__DEV__) {
  import('../../reactotron-config')
}

export function App() {
  return <MainRouteCollection />
}
