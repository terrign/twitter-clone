import { useFormContext } from 'react-hook-form'
import { FormItem } from '@components/UI/Form/FormItem'
import { Input } from '@components/UI/Input'
import { inputNameMap } from '@constants/index'

interface Props {
  labeled?: boolean
  name: keyof typeof inputNameMap
}

export const FormInput = ({ name, labeled }: Props) => {
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
