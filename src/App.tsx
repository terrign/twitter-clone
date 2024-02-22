import './App.css'

import { ErrorBoundary } from '@components'
import { ThemeProvider } from '@context'
import { Router } from '@router'
import { persistor, store } from '@store'
import React from 'react'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-unresolved
import { PersistGate } from 'redux-persist/lib/integration/react'

export const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
