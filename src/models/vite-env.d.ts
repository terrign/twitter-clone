/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare module '*.png'

declare module '*.jpg'

declare module '*.webp'

declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>

  export default ReactComponent
}
