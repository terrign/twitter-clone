import { DefaultAvatarImage } from '@assets/index'
import { StyledAvatar } from './styled'

export enum AvatarSize {
  LARGE = '130px',
  MEDIUM = '60px',
  SMALL = '50px',
}

interface Props {
  photoURL: string
  size: AvatarSize
}

export const Avatar = ({ photoURL, size }: Props) => {
  const url = photoURL || DefaultAvatarImage

  return <StyledAvatar $url={url} $size={size} />
}
