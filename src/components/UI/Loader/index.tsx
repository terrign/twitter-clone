import { Color } from '@constants/styles'
import { LoaderCenter, StyledLoader } from './styled'

interface Props {
  h?: string
  w?: string
  size?: 's' | 'l'
  color?: Color
}

export const Loader = (props: Props) => {
  const { h, w, size, color } = props

  return (
    <LoaderCenter $h={h} $w={w}>
      <StyledLoader $size={size} $color={color} />
    </LoaderCenter>
  )
}
