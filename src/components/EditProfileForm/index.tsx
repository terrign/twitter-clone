import { yupResolver } from '@hookform/resolvers/yup'
import { storageService } from '@services'
import { setAlert, updateUser, useAppDispatch, useAppSelector } from '@store'
import { Button, Form, FormInput, FormItem } from '@ui'
import { editProfileValidationSchema } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ImageInput } from './ImageInput'

export const EditProfileForm = () => {
  const { photoURL, name, bio, gender, tgLink, uid } = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()

  const nav = useNavigate()

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(editProfileValidationSchema()),
    values: {
      name,
      bio,
      gender,
      tgLink,
    },
  })

  const { handleSubmit } = form

  const submitHandler = handleSubmit(async ({ image, ...rest }) => {
    if (image instanceof File) {
      const urlUploadResult: Error | string = await storageService.addFile(image)

      if (urlUploadResult instanceof Error) {
        dispatch(setAlert({ type: 'error', message: urlUploadResult.message }))
      } else {
        dispatch(updateUser({ ...rest, uid, photoURL: urlUploadResult }))
        nav(-1)
      }
    } else {
      dispatch(updateUser({ ...rest, uid }))
      nav(-1)
    }
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
