import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ButtonType } from '@components/UI/Button'
import { Form } from '@components/UI/Form'
import { FormInput } from '@components/UI/Form/FormInput'
import { FormItem } from '@components/UI/Form/FormItem'
import { useAppDispatch } from '@store/index'
import { updatePassword } from '@store/slices/auth'
import { changePasswordValidationSchema } from '@utils/formValidationSchemas'

export const ChangePasswordForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordValidationSchema()),
  })

  const { handleSubmit } = form
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const submitHandler = handleSubmit(async ({ currentPassword, newPassword }) => {
    dispatch(updatePassword({ currentPassword, newPassword }))
    navigate(-1)
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
          <Button $type={ButtonType.FILLED} type="submit">
            Update
          </Button>
        </FormItem>
      </Form>
    </FormProvider>
  )
}
