import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { updatePassword, useAppDispatch } from '@store'
import { Button, Form, FormInput, FormItem } from '@ui'
import { changePasswordValidationSchema } from '@utils'

export const ChangePasswordForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordValidationSchema()),
  })

  const { handleSubmit } = form

  const nav = useNavigate()

  const dispatch = useAppDispatch()

  const submitHandler = handleSubmit(async ({ currentPassword, newPassword }) => {
    dispatch(updatePassword({ currentPassword, newPassword }))
    nav(-1)
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler}>
        <br />
        <FormItem>
          <h3>Change password</h3>
        </FormItem>
        <FormInput name="currentPassword" labeled />

        <FormInput name="newPassword" labeled />

        <FormInput name="confirmPassword" labeled />

        <FormItem>
          <Button $type="filled" type="submit">
            Update
          </Button>
        </FormItem>
      </Form>
    </FormProvider>
  )
}
