import './App.css'

import { ErrorBoundary } from '@components'
import { ThemeProvider } from '@context'
import { Router } from '@router'
import { persistor, store } from '@store'
import { Loader } from '@ui'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-unresolved
import { PersistGate } from 'redux-persist/lib/integration/react'

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}
