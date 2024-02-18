import { inputNameMap } from '@constants'
import { SignUpFormFields } from '@types'
import { FormItem, Input } from '@ui'
import { useFormContext } from 'react-hook-form'

export const FormInput = ({ name }: { name: keyof SignUpFormFields }) => {
  const { register, formState } = useFormContext<SignUpFormFields>()
  const error = formState.errors[name]?.message

  const { type, label } = inputNameMap[name]

  return (
    <FormItem errorMessage={error}>
      <Input placeholder={label} type={type} {...register(name)} />
    </FormItem>
  )
}
