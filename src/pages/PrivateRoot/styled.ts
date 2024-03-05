import { Color, screen } from '@constants/styles'
import styled, { css } from 'styled-components'

export const PrivateRootWrapper = styled.section`
  display: grid;
  max-width: 1440px;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  grid-template-columns: minmax(150px, 230px) minmax(500px, 900px) minmax(260px, 300px);
  grid-column-gap: 1rem;

  @media ${screen.xl} {
    padding: 0;
  }

  @media ${screen.l} {
    grid-template-columns: 50px 1fr minmax(260px, 300px);
    grid-column-gap: 0;
  }

  @media ${screen.m} {
    grid-template-columns: 50px 1fr;
  }
`

export const MainWrapper = styled.section`
  width: 100%;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  border-right: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: -1rem;
  padding: 1rem 0.5rem 0.5rem;

  @media ${screen.l} {
    margin-top: 0;
  }
`

const visibleAside = css`
  left: calc(100% - 300px);
  width: 100%;
  max-width: 300px;
  z-index: 300;

  background: ${({ theme }) => theme.bgColor};
  height: 100%;

  @media ${screen.s} {
    width: 100%;
    max-width: unset;
    left: 0;
  }
`

export const RightAside = styled.aside<{ $visible: boolean }>`
  transition: left 0.2s linear;

  background: ${({ theme }) => theme.bgColor};

  @media ${screen.m} {
    position: fixed;
    left: 1000px;

    border-left: 1px solid ${Color.PALE_GRAY};

    ${({ $visible }) => $visible && visibleAside};
  }
`
