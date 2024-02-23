import { AddPhoto, DefaultAvatarImage } from '@assets'
import { convertBase64 } from '@utils'
import { ChangeEvent, useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { StyledImageInput } from './styled'

export const ImageInput = ({ photoURL }: { photoURL: string }) => {
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

  return (
    <StyledImageInput $image={backgroundImage || photoURL || DefaultAvatarImage}>
      <label htmlFor={id}>
        <div>
          <AddPhoto />
        </div>
      </label>
      <input type="file" accept="image/*" hidden id={id} onChange={fileChangeHanlder} />
    </StyledImageInput>
  )
}
