import styled from 'styled-components'
import { AvatarSize } from '@components/UI/Avatar'

interface Props {
  $size: AvatarSize
  $url: string
}

export const StyledAvatar = styled.div<Props>`
  height: ${({ $size }) => $size};
  width: ${({ $size }) => $size};

  border: 5px solid ${({ theme }) => theme.bgColor};
  background-image: url(${({ $url }) => $url});

  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgColor};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`
