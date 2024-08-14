import styled from 'styled-components'
import { screen } from '@constants/styles'

export const UserName = styled.div`
  p:first-child {
    font-weight: 700;
    word-break: break-word;
    max-width: 300px;
  }

  p:last-child {
    color: ${({ theme }) => theme.fontColorTertiary};
    font-size: ${({ theme }) => theme.fontS};
  }

  @media ${screen.m} {
    p:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
  }
`

export const AsideButton = styled.button`
  display: none;

  @media ${screen.m} {
    display: block;
  }
`

export const ProfileBackground = styled.div<{ $url: string }>`
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
