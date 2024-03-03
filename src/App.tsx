import { Provider } from 'react-redux'
import { ErrorBoundary } from '@components'
import { ThemeProvider } from '@context'
import { Router } from '@router'
import { persistor, store } from '@store'
import { Loader } from '@ui'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './App.css'

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<Loader size="l" />} persistor={persistor}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}
