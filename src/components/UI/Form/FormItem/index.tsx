import { PropsWithChildren } from 'react'

import { StyledFormItem } from './styled'

export interface FormItemProps extends PropsWithChildren {
  errorMessage?: string
}

export const FormItem = ({ children, errorMessage }: FormItemProps) => {
  return (
    <StyledFormItem $hasError={Boolean(errorMessage)}>
      {children}
      {Boolean(errorMessage) && <span>{errorMessage}</span>}
    </StyledFormItem>
  )
}
