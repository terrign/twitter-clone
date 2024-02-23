import { inputNameMap } from '@constants'
import { FormItem, Input } from '@ui'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  labeled?: boolean
  name: keyof typeof inputNameMap
}

export const FormInput = ({ name, labeled }: FormInputProps) => {
  const { register, formState } = useFormContext()
  const error = formState.errors[name]?.message

  const { type, label } = inputNameMap[name]

  return (
    <FormItem errorMessage={error?.toString()} labeled={labeled}>
      {labeled && <label htmlFor={name}>{label}</label>}
      <Input placeholder={labeled ? undefined : label} type={type} {...register(name)} id={name} name={name} />
    </FormItem>
  )
}
