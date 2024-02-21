import { ErrorBoundary } from '@components'
import { ThemeProvider } from '@context'
import { persistor, store } from '@store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/no-unresolved
import { PersistGate } from 'redux-persist/lib/integration/react'

import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
