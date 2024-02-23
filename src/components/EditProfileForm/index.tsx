import { yupResolver } from '@hookform/resolvers/yup'
import { storageService } from '@services'
import { updateUser, useAppDispatch, useAppSelector } from '@store'
import { Button, Form, FormInput, FormItem } from '@ui'
import { EditProfileValidationSchema } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ImageInput } from './ImageInput'

export const EditProfileForm = () => {
  const { photoURL, name, bio, gender, tgLink, uid } = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()

  const nav = useNavigate()

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(EditProfileValidationSchema()),
    values: {
      name,
      bio,
      gender,
      tgLink,
    },
  })

  const { handleSubmit } = form

  const submitHandler = handleSubmit(async ({ image, ...rest }) => {
    if (image instanceof Blob) {
      storageService.addBlob(image as Blob, (url) => {
        dispatch(
          updateUser({
            ...rest,
            uid,
            photoURL: url,
          }),
        )
      })
    } else {
      dispatch(updateUser({ ...rest, uid }))
    }

    nav(-1)
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler}>
        <ImageInput photoURL={photoURL} />

        <FormInput name="name" labeled />

        <FormInput name="bio" labeled />

        <FormInput name="tgLink" labeled />

        <FormInput name="gender" labeled />

        <FormItem>
          <Button $type="filled" type="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    </FormProvider>
  )
}
