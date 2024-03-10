import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ButtonType } from '@components/UI/Button'
import { Form } from '@components/UI/Form'
import { FormInput } from '@components/UI/Form/FormInput'
import { FormItem } from '@components/UI/Form/FormItem'
import { storageService } from '@services/Storage'
import { useAppDispatch, useAppSelector } from '@store/index'
import { setErrorNotification } from '@store/slices/notification'
import { selectUser, updateUser } from '@store/slices/user'
import { editProfileValidationSchema } from '@utils/formValidationSchemas'
import { ImageInput } from './ImageInput'

export const EditProfileForm = () => {
  const { photoURL, name, bio, gender, tgLink, uid } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

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
      const urlUploadResult: Error | string = await storageService.addUserAvatar(image, uid)

      if (urlUploadResult instanceof Error) {
        dispatch(setErrorNotification(urlUploadResult.message))
      } else {
        dispatch(updateUser({ ...rest, uid, photoURL: urlUploadResult }))
        navigate(-1)
      }
    } else {
      dispatch(updateUser({ ...rest, uid }))
      navigate(-1)
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
          <Button $type={ButtonType.FILLED} type="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    </FormProvider>
  )
}
