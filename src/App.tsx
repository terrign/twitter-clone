import { Provider } from 'react-redux'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Loader } from '@components/UI/Loader'
import { ThemeProvider } from '@context/Theme'
import { Router } from '@router/index'
import { persistor, store } from '@store/index'
import { PersistGate } from 'redux-persist/lib/integration/react'

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
