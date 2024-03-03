import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import { useOuterClickHandler } from '@hooks'
import { Loader, SearchInput } from '@ui'
import { SearchResults, StyledSearch } from './styled'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  result?: ReactNode
  isLoading: boolean
}

export const Search = ({ result, isLoading, ...rest }: Props) => {
  const [searchVisible, setSearchVisible] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const hideResults = () => {
    setSearchVisible(false)
  }

  const showResults = () => {
    setSearchVisible(true)
  }

  useOuterClickHandler(searchRef, hideResults)

  return (
    <StyledSearch ref={searchRef}>
      <SearchInput>
        <input {...rest} onFocus={showResults} />
      </SearchInput>
      <SearchResults $visible={searchVisible}>{isLoading ? <Loader /> : result}</SearchResults>
    </StyledSearch>
  )
}
