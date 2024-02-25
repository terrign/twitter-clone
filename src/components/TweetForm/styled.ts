import { Color, font } from '@constants'
import styled from 'styled-components'

export const StyledTweetForm = styled.section`
  display: grid;
  grid-template-columns: 70px 1fr;
  width: 100%;
  padding: 0.5rem;

  grid-row-gap: 1rem;

  border-top: 1px solid ${({ theme }) => theme.buttonBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.buttonBorderColor};

  form {
    position: relative;
    width: 100%;
    display: flex;
    height: 100%;
    padding: 0;
    height: 125px;
  }

  button {
    top: 70px;
    width: 120px;
    display: block;
    place-self: end;
  }
`

export const StyledTextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 0 0 0.5rem;

  textarea {
    ${font};
    font-size: ${({ theme }) => theme.fontM};

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
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
    height: 20px;

    font-size: ${({ theme }) => theme.fontXS};
    line-height: 33px;
    color: ${Color.GRAY};
  }
`

export const CloseButton = styled.button.attrs({ type: 'button' })`
  height: 25px;
  width: 25px;
  padding: 0;

  transition: transform 0.1s linear;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.4);
    }
  }
`
