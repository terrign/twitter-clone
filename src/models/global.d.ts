import 'styled-components'
import { ThemeObject } from '@models/index'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObject {}
}

declare module '*.png'

declare module '*.jpg'

declare module '*.webp'
