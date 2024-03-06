import styled, { css } from 'styled-components'
import { screen } from '@constants/styles'

const compactTweetCardStyles = css`
  grid-template-columns: 50px 1fr 50px;
`

export const StyledTweetCard = styled.article<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: 70px minmax(200px, 1fr) 70px;

  grid-auto-rows: minmax(1rem, auto);
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding-top: 1rem;
  grid-row-gap: 0.5rem;

  ${({ $compact }) => $compact && compactTweetCardStyles};

  @media ${screen.s} {
    ${compactTweetCardStyles}
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

const compactTweetAvatarStyles = css`
  grid-row: 1;
  grid-column: 1;
  margin-left: -5px;
`

export const TweetAvatar = styled.div<{ $compact?: boolean }>`
  grid-row: 1 / 2;

  ${({ $compact }) => $compact && compactTweetCardStyles}
  margin-top: ${({ $compact }) => $compact && '-5px'};

  @media ${screen.s} {
    ${compactTweetAvatarStyles}
  }
`

export const Likes = styled.footer<{ $compact?: boolean }>`
  color: ${({ theme }) => theme.fontSecondary};

  display: ${({ $compact }) => ($compact ? 'none' : 'flex')};
  grid-column: 2;

  button {
    font-size: ${({ theme }) => theme.fontS};
    padding: 0;
  }

  @media ${screen.s} {
    grid-column: 1;
  }
`

const compactTweetContentStyles = css`
  grid-column: 1 / span 3;
`

export const TweetContent = styled.p<{ $compact?: boolean }>`
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

  ${({ $compact }) => $compact && compactTweetContentStyles}

  @media ${screen.s} {
    ${compactTweetContentStyles}
  }
`
