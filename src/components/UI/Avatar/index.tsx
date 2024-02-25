import { DefaultAvatarImage } from '@assets'

import { StyledAvatar } from './styled'

export const Avatar = ({ photoURL, size }: { photoURL: string; size: 'l' | 's' | 'm' }) => {
  const url = photoURL || DefaultAvatarImage

  return <StyledAvatar $url={url} $size={size} />
}
