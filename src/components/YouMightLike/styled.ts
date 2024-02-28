import { Color, screen } from '@constants'
import { Button } from '@ui'
import styled from 'styled-components'

export const FollowButton = styled(Button)`
  background: ${Color.BLACK};
  height: 25px;
  width: 62px;

  font-size: ${({ theme }) => theme.fontS};
`

export const StyledYouMightLike = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  position: sticky;
  top: 1rem;

  @media ${screen.l} {
    padding: 1rem 0.5rem 0.5rem;
    top: 0;
  }

  h3 {
    margin: 0;
  }
`

export const SuggestedImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  flex-wrap: wrap;
  width: 100%;
  height: 150px;
  border-radius: 6px;
  overflow: hidden;
`

export const SuggestedImage = styled.div<{ $url: string }>`
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;

  cursor: pointer;
`

export const SuggestedUsers = styled.div`
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const Header = styled.header`
  display: flex;

  & > div {
    flex-grow: 1;
  }

  button {
    display: none;
    transform: scaleX(-1);
  }

  @media ${screen.m} {
    button {
      display: block;
      transform: scaleX(-1);
    }
  }
`
