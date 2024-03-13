import { Color } from '@constants/styles'
import { LoaderCenter, StyledLoader } from './styled'

export enum LoaderSize {
  LARGE = 2,
  DEFAULT = 1,
  SMALL = 0.7,
}
interface Props {
  h?: string
  w?: string
  size?: LoaderSize
  color?: Color
}

export const Loader = (props: Props) => {
  const { h, w, size = LoaderSize.DEFAULT, color = Color.BLUE } = props

  return (
    <LoaderCenter $h={h} $w={w}>
      <StyledLoader $size={size} $color={color} />
    </LoaderCenter>
  )
}
