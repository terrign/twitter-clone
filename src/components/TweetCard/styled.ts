import { Color } from '@constants'
import styled from 'styled-components'

export const StyledTweetCard = styled.article`
  display: grid;
  grid-template-columns: 70px minmax(200px, 1fr) 70px;
  grid-template-rows: 1rem 1fr 1rem;
  width: 100%;
  border-bottom: 1px solid ${Color.GRAY};
  padding-bottom: 1rem;
  grid-row-gap: 0.5rem;
`

export const CardHeader = styled.header`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;

  height: 1rem;
  line-height: 1rem;

  font-size: ${({ theme }) => theme.fontS};

  div {
    display: flex;

    & > *:not(:first-child) {
      margin-left: 0.2rem;
    }

    & > span {
      color: ${Color.GRAY};
    }
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
`

export const Likes = styled.footer`
  color: ${({ theme }) => theme.fontSecondary};

  display: flex;
  grid-column: 2;

  button {
    font-size: ${({ theme }) => theme.fontS};
    padding: 0;
  }
`

export const TweetContent = styled.p`
  grid-column: 2;

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
`
