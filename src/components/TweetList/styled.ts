import styled from 'styled-components'
import { columnFlex } from '@constants/styles'

export const StyledTweetList = styled.section`
  ${columnFlex};
  width: 100%;

  & > * {
    margin-top: 1rem;
  }
`
