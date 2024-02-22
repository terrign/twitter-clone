import styled from 'styled-components'

export const StyledProfileInfo = styled.section`
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
