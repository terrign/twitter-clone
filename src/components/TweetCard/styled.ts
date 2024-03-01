import { screen } from '@constants'
import styled from 'styled-components'

export const StyledTweetCard = styled.article`
  display: grid;
  grid-template-columns: 70px minmax(200px, 1fr) 70px;

  grid-auto-rows: minmax(1rem, auto);
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding-top: 1rem;
  grid-row-gap: 0.5rem;

  @media ${screen.s} {
    grid-template-columns: 50px 1fr 50px;
  }
`

export const CardHeader = styled.header`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;

  line-height: 1rem;

  font-size: ${({ theme }) => theme.fontS};

  & > div {
    width: 100%;
  }

  & > div > p {
    display: flex;
    flex-wrap: wrap;
    max-width: 100% !important;
    width: 100%;
  }

  button {
    padding: 0.5rem;

    span {
      display: block;
      position: relative;
      top: -15px;
    }
  }
`

export const TweetAvatar = styled.div`
  grid-row: 1 / 3;

  @media ${screen.s} {
    grid-row: 1;
    grid-column: 1;
  }
`

export const Likes = styled.footer`
  color: ${({ theme }) => theme.fontSecondary};

  display: flex;
  grid-column: 2;

  button {
    font-size: ${({ theme }) => theme.fontS};
    padding: 0;
  }

  @media ${screen.s} {
    grid-column: 1;
  }
`

export const TweetContent = styled.p`
  grid-column: 2;
  cursor: pointer;

  span {
    display: block;

    font-size: ${({ theme }) => theme.fontS};

    word-wrap: break-word;
    overflow: hidden;
  }

  img {
    display: block;
    margin: 1rem 0;
    max-width: 100%;

    border-radius: 6px;

    height: auto;
  }

  @media ${screen.s} {
    grid-column: 1 / span 3;
  }
`
