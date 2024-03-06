import * as React from 'react'

const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }> = (props) => {
  return <svg {...props} />
}

export default ReactComponent
