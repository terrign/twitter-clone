import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useRef } from 'react'
import { Loader } from '@components/UI/Loader'
import { SearchInput } from '@components/UI/SearchInput'
import { useBooleanState } from '@hooks/useBooleanState'
import { useOuterClickHandler } from '@hooks/useOuterClickHandler'
import { SearchResults, StyledSearch } from './styled'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  result?: ReactNode
  isLoading: boolean
}

export const Search = (props: Props) => {
  const { result, isLoading, ...rest } = props
  const [resultsVisible, , showResults, hideResults] = useBooleanState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useOuterClickHandler(searchRef, hideResults)

  return (
    <StyledSearch ref={searchRef}>
      <SearchInput>
        <input {...rest} onFocus={showResults} />
      </SearchInput>
      <SearchResults $visible={resultsVisible}>{isLoading ? <Loader /> : result}</SearchResults>
    </StyledSearch>
  )
}
