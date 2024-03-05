import { useFormContext } from 'react-hook-form'
import { FormItem } from '@components/UI/Form/FormItem'
import { Select } from '@components/UI/Select'
import { DAYS, MONTHS, YEARS } from '@constants/index'
import { SignUpFormFields } from '@models/index'
import { StyledDatePicker } from './styled'

export const FormDatepicker = () => {
  const {
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SignUpFormFields>()

  const getSelectHandler = (type: 'day' | 'month' | 'year') => (value: string) => {
    const definedValue = type === 'month' ? MONTHS[value as keyof typeof MONTHS] : value
    setValue(type, definedValue)
    trigger(type)
  }

  const getError = () => {
    const { day, month, year } = errors

    return month?.message || day?.message || year?.message
  }

  const { day, month, year } = getValues()

  return (
    <FormItem errorMessage={getError()}>
      <StyledDatePicker>
        <Select value={month} onSelect={getSelectHandler('month')} options={Object.keys(MONTHS)} placeHolder="Month" />

        <Select value={day} onSelect={getSelectHandler('day')} options={DAYS} placeHolder="Day" />

        <Select value={year} onSelect={getSelectHandler('year')} options={YEARS} placeHolder="Year" />
      </StyledDatePicker>
    </FormItem>
  )
}
