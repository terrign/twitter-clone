import { useFormContext } from 'react-hook-form'
import { FormItem } from '@components/UI/Form/FormItem'
import { Select } from '@components/UI/Select'
import { MONTH_NAMES, YEARS } from '@constants/index'
import { SignUpFormFields } from '@models/index'
import { getDayArrayFromMonthAndYear, getNewDayIfNotLegitDate } from '@utils/date'
import { StyledDatePicker } from './styled'

export const FormDatepicker = () => {
  const {
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SignUpFormFields>()

  const getSelectHandler = (type: 'day' | 'month' | 'year') => (value: string) => {
    const { day, month, year } = getValues()
    const currentMonth = type === 'month' ? value : month
    const currentYear = type === 'year' ? value : year
    const validatedDay = getNewDayIfNotLegitDate(day, MONTH_NAMES.indexOf(currentMonth), currentYear)

    if (day !== validatedDay) {
      setValue('day', validatedDay)
    }

    setValue(type, value)
    trigger(type)
  }

  const getError = () => {
    const { day, month, year } = errors

    return month?.message || day?.message || year?.message
  }

  const { day, month, year } = getValues()

  const dayOptions = getDayArrayFromMonthAndYear(MONTH_NAMES.indexOf(month), year)

  return (
    <FormItem errorMessage={getError()}>
      <StyledDatePicker>
        <Select value={month} onSelect={getSelectHandler('month')} options={MONTH_NAMES} placeHolder="Month" />

        <Select value={day} onSelect={getSelectHandler('day')} options={dayOptions} placeHolder="Day" />

        <Select value={year} onSelect={getSelectHandler('year')} options={YEARS} placeHolder="Year" />
      </StyledDatePicker>
    </FormItem>
  )
}
