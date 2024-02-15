import styled from 'styled-components'

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 1rem;

  section {
    flex: 1 0 auto;
  }

  footer {
    flex: 0 0 auto;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
  }
`

export const Main = styled.section`
  display: flex;
  row-gap: 1rem;
  align-items: center;
`

export const TwitterBackGround = styled.div`
  background-image: url('./back-twitter.jpg');
  background-repeat: no-repeat;
  background-position: center;
  flex-basis: 1114px;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
  margin-right: 4rem;
  flex: 1 1 auto;

  h1 {
    margin-top: 3rem;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  div {
    max-width: 400px;

    p {
      font-size: ${({ theme }) => theme.fontXS};
      margin-top: 1.5rem;
    }

    p:last-child {
      font-size: ${({ theme }) => theme.fontS};
      margin-top: 1rem;
    }

    button {
      line-height: 30px;
      margin-top: 1rem;
      span {
        display: grid;
        justify-content: center;
        grid-template-columns: auto auto;
        gap: 5px;
      }
    }
  }
`
