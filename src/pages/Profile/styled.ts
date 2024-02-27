import { Color, screen } from '@constants'
import styled from 'styled-components'

export const ProfileWrapper = styled.section`
  width: 100%;
  border-left: 1px solid ${Color.PALE_GRAY};
  border-right: 1px solid ${Color.PALE_GRAY};
  margin-top: -1rem;
  padding: 1rem 0.5rem 0.5rem;

  @media ${screen.l} {
    margin-top: 0;
  }
`

export const ProfileHeader = styled.header`
  p:first-child {
    font-weight: 700;
    word-wrap: break-word;
    max-width: 300px;
  }

  p:last-child {
    color: ${Color.GRAY};
    font-size: ${({ theme }) => theme.fontS};
  }
`

export const ProfileBackground = styled.div<{ $url: string }>`
  margin-top: 0.5rem;
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;

  @media ${screen.m} {
    height: 150px;
  }
`
