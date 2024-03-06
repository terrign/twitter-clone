import styled from 'styled-components'
import { screen } from '@constants/styles'

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 1rem;
  margin-top: -1rem;
  margin-left: -1rem;

  section {
    flex: 1 0 auto;
  }

  footer {
    flex: 0 0 auto;
    margin-top: 0.5rem;
    margin-bottom: -1rem;
  }

  @media ${screen.m} {
    margin-right: -1rem;
  }
`

export const Main = styled.section`
  display: flex;
  align-items: center;

  @media ${screen.m} {
    flex-direction: column;
  }

  a:has(svg) {
    display: none;
  }
`

export const TwitterBackGround = styled.div<{ $url: string }>`
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-position: center;

  flex-basis: 1114px;
  height: 100%;

  @media ${screen.m} {
    flex-basis: auto;
    background-size: cover;
    width: 100%;
    height: 250px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
  flex: 1 1 auto;

  h2 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;

    @media ${screen.m} {
      margin-top: 0;
    }
  }

  div {
    max-width: 400px;

    a:has(button) {
      &:hover {
        text-decoration: none;
      }
    }

    button {
      line-height: 30px;
      margin-top: 1rem;
      span {
        display: grid;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 5px;
        text-decoration: none;
      }
    }
  }

  *:not(:first-child) {
    margin-top: 1rem;
  }

  @media ${screen.m} {
    padding: 1rem;
    margin-left: 1rem;
  }
`

export const HomeTermsText = styled.p`
  font-size: ${({ theme }) => theme.fontXS};
`

export const HomeLoginText = styled.p`
  font-size: ${({ theme }) => theme.fontS};
`
