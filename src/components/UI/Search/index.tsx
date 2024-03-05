import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import { Loader } from '@components/UI/Loader'
import { SearchInput } from '@components/UI/SearchInput'
import { useOuterClickHandler } from '@hooks/useOuterClickHandler'
import { SearchResults, StyledSearch } from './styled'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  result?: ReactNode
  isLoading: boolean
}

export const Search = (props: Props) => {
  const { result, isLoading, ...rest } = props
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
