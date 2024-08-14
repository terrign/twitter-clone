import styled from 'styled-components'
import { TweetButton } from '@components/UI/Button'
import { Color, columnFlex, font, mediaHover, screen, spaceFlex } from '@constants/styles'

export const StyledTweetForm = styled.section`
  display: grid;
  grid-template-columns: 70px 1fr;
  width: 100%;
  padding: 1rem 0;

  grid-row-gap: 1rem;

  border-top: 1px solid ${({ theme }) => theme.borderColor};

  @media ${screen.s} {
    grid-template-columns: 50px 1fr;
  }

  form {
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
    padding: 0;
    height: 125px;
  }
`

export const FirstColumn = styled.div`
  ${spaceFlex};
  flex-direction: column;
`

export const TweetFormSubmitButton = styled(TweetButton)`
  width: 120px;
  align-self: end;

  @media ${screen.l} {
    width: 40px;
  }
`

export const StyledTextArea = styled.div`
  ${columnFlex};
  width: 100%;

  textarea {
    ${font};
    font-size: ${({ theme }) => theme.fontM};

    padding-top: 1rem;

    flex: 1 0 auto;

    width: 100%;
    height: max-content;

    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  label {
    color: ${Color.BLUE};
    cursor: pointer;
    padding: 0;

    span {
      display: inline-block;
      margin-left: 0.5rem;
      line-height: 33px;
      padding: 0;
      height: 20px;
      color: ${Color.GRAY};
    }
  }

  div {
    ${spaceFlex};

    font-size: ${({ theme }) => theme.fontXS};

    color: ${Color.GRAY};

    padding-right: 1rem;
    height: 20px;
    line-height: 33px;
  }
`

export const CloseButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  left: calc(100% - 25px);
  top: 0;
  height: 25px;
  width: 25px;
  padding: 0;

  text-shadow:
    0 0 2px ${Color.WHITE},
    0 0 2px ${Color.WHITE};

  transition: transform 0.1s linear;

  @media ${mediaHover} {
    &:hover {
      transform: scale(1.4);
    }
  }
`

export const AddedImage = styled.div`
  position: relative;

  width: 50px;
  height: 50px;
`
