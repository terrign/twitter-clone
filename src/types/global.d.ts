import 'styled-components'

import { ThemeObject } from '@types'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {}
}

declare module '*.png'

declare module '*.jpg'

declare module '*.svg?react'
