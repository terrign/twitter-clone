import styled from 'styled-components'
import { Centered } from '@components/UI/Centered'
import { LoaderSize } from '@components/UI/Loader'
import { animation } from '@components/UI/Loader/constants'
import { Color } from '@constants/styles'

export const LoaderCenter = styled(Centered)<{ $h?: string; $w?: string }>`
  height: ${({ $h }) => $h};
  width: ${({ $w }) => $w};
`

interface LoaderProps {
  $size: LoaderSize
  $color: Color
}

export const StyledLoader = styled.div<LoaderProps>`
  color: ${({ $color }) => $color};
  font-size: 0.3rem;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  position: relative;
  animation: ${animation} 1.3s infinite linear;
  transform: scale(${({ $size }) => $size});
`
