import { ErrorBoundary } from '@components'
import { ThemeProvider } from '@context'
import { store } from '@store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
