import { screen } from '@constants'
import styled from 'styled-components'

export const UserName = styled.div`
  p:first-child {
    font-weight: 700;
    word-wrap: break-word;
    max-width: 300px;
  }
  p:last-child {
    color: ${({ theme }) => theme.fontColorTertiary};
    font-size: ${({ theme }) => theme.fontS};
  }
`

export const AsideButton = styled.button`
  display: none;

  @media ${screen.m} {
    display: block;
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
    height: 200px;
  }

  @media ${screen.s} {
    height: 150px;
  }
`
