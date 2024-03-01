import { LoaderCenter, StyledLoader } from './styled'

interface Props {
  h?: string
  w?: string
}

export const Loader = ({ h, w }: Props) => {
  return (
    <LoaderCenter $h={h} $w={w}>
      <StyledLoader />
    </LoaderCenter>
  )
}
