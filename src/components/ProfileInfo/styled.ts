import styled from 'styled-components'

export const StyledProfileInfo = styled.section`
  font-size: ${({ theme }) => theme.fontS};

  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 1rem;

  & > div {
    margin-top: -3rem;
    display: grid;
    grid-template-columns: 1fr;
  }

  button {
    max-width: 120px;
    padding: 0;
    height: 40px;
  }
`

export const Bio = styled.p`
  margin-top: 1rem;
`

export const TelegramIcon = styled.img.attrs({ alt: 'telegram' })`
  height: 1rem;
  width: 1rem;
`

export const TelegramLink = styled.a`
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
`
