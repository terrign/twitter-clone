import styled from 'styled-components'

const sizeMap = {
  l: '130px',
  s: '50px',
  m: '60px',
}

export const Avatar = styled.div<{ $size: keyof typeof sizeMap; $url: string }>`
  height: ${({ $size }) => sizeMap[$size]};
  width: ${({ $size }) => sizeMap[$size]};

  border: 5px solid ${({ theme }) => theme.bgColor};
  border-radius: 50%;

  overflow: hidden;

  background-image: url(${({ $url }) => $url});
  background-color: ${({ theme }) => theme.bgColor};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
