import { ChangeEvent, useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AddPhoto, DefaultAvatarImage } from '@assets/index'
import { convertBase64 } from '@utils/index'
import { StyledImageInput } from './styled'

interface Props {
  photoURL: string
}

export const ImageInput = ({ photoURL }: Props) => {
  const id = useId()
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const { setValue } = useFormContext()

  const fileChangeHanlder = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      const file = files[0]
      const image = await convertBase64(file)
      setValue('image', file)
      setBackgroundImage(image)
    }
  }

  const displayImageUrl = backgroundImage || photoURL || DefaultAvatarImage

  return (
    <StyledImageInput $image={displayImageUrl}>
      <label htmlFor={id}>
        <div>
          <AddPhoto />
        </div>
      </label>
      <input type="file" accept="image/*" hidden id={id} onChange={fileChangeHanlder} />
    </StyledImageInput>
  )
}
