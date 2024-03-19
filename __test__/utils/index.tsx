import { Provider } from 'react-redux'
import { MemoryRouter, Routes } from 'react-router-dom'
import { ThemeProvider } from '@context/Theme'
import { store } from '@store/index'

export const Wrappers = ({ children, routerEntries }: { children: React.ReactNode; routerEntries?: string[] }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={routerEntries}>
          <Routes>{children}</Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}
