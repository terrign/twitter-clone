import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Loader, LoaderSize } from '@components/UI/Loader'
import { ThemeProvider } from '@context/Theme'
import { persistor, store } from '@store/index'
import { PersistGate } from 'redux-persist/lib/integration/react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<Loader size={LoaderSize.LARGE} />} persistor={persistor}>
          <ThemeProvider>{children}</ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}
