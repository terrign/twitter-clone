import styled from 'styled-components'
import { Button } from '@components/UI/Button'

export const StyledUserList = styled.div`
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const FollowButton = styled(Button)`
  background: ${({ theme }) => theme.reverseBgColor};
  color: ${({ theme }) => theme.reverseFontColor};
  height: 25px;
  width: 62px;

  font-size: ${({ theme }) => theme.fontS};
`
