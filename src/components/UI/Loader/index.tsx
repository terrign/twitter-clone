import { Color } from '@constants'
import { LoaderCenter, StyledLoader } from './styled'

interface Props {
  h?: string
  w?: string
  size?: 's' | 'l'
  color?: Color
}

export const Loader = ({ h, w, size, color }: Props) => {
  return (
    <LoaderCenter $h={h} $w={w}>
      <StyledLoader $size={size} $color={color} />
    </LoaderCenter>
  )
}
