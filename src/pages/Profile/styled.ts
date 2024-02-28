import { screen } from '@constants'
import styled from 'styled-components'

export const ProfileWrapper = styled.section`
  width: 100%;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: -1rem;
  padding: 1rem 0.5rem 0.5rem;

  @media ${screen.l} {
    margin-top: 0;
  }
`

export const ProfileHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;

  background: ${({ theme }) => theme.bgColor};

  div > p:first-child {
    font-weight: 700;
    word-wrap: break-word;
    max-width: 300px;
  }

  div > p:last-child {
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
