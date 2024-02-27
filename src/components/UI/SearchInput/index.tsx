import { SearchIcon } from '@assets'
import { PropsWithChildren } from 'react'

import { StyledSearchInput } from './styled'

export const SearchInput = ({ children }: PropsWithChildren) => {
  return (
    <StyledSearchInput>
      <SearchIcon />
      {children}
    </StyledSearchInput>
  )
}
