import { PropsWithChildren } from 'react'
import { SearchIcon } from '@assets/index'
import { StyledSearchInput } from './styled'

export const SearchInput = ({ children }: PropsWithChildren) => {
  return (
    <StyledSearchInput>
      <SearchIcon />
      {children}
    </StyledSearchInput>
  )
}
