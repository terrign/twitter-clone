import { Route } from 'react-router-dom'
import { ThemeToggler } from '@components/Header/ThemeToggler'
import { Theme } from '@models/index'
import { store } from '@store/index'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Theme toggler', () => {
  test('Changes theme', async () => {
    render(
      <Wrappers routerEntries={[`/home`]}>
        <Route path="/" element={<div />} />
        <Route path="/home" element={<ThemeToggler />} />
      </Wrappers>,
    )

    fireEvent.click(screen.getByLabelText('theme toggler'))

    expect(store.getState().user.theme).toBe(Theme.DARK)
  })
})
