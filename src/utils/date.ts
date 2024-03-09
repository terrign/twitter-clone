import { MONTH_NAMES } from '@constants/index'

enum MonthMaxDays {
  FEBRUARY_NON_LEAP = 28,
  FEBRUARY_LEAP,
  MONTH_SHORT,
  MONTH_LONG,
}

const LONG_MONTH_INDEXES = [0, 2, 4, 6, 7, 9, 11]

const generateYears = () => {
  const years = []
  let nowYear = new Date().getFullYear()

  for (let i = 0; i < 150; i++) {
    years.push(String(nowYear))
    nowYear--
  }

  return years
}

const generateDays = (count: number) => {
  const days = []

  for (let i = 1; i <= count; i++) {
    days.push(String(i).padStart(2, '0'))
  }

  return days
}

const getHumanMonthDayFromTimeStamp = (timestamp: number) =>
  new Date(timestamp).toLocaleString('en-US', { month: 'long', day: 'numeric' })

const isLeapYear = (year: string | undefined) => {
  if (!year) {
    return true
  }

  const numYear = Number(year)

  if (isNaN(numYear)) {
    return true
  }

  return (0 == numYear % 4 && 0 != numYear % 100) || 0 == numYear % 400
}

const getDayCount = (monthIndex: number, year?: string) => {
  let dayCount = 0
  const isFebruary = monthIndex === 1
  const realMonthIndex = monthIndex !== -1
  const isLongMonth = LONG_MONTH_INDEXES.includes(monthIndex)

  if (isFebruary) {
    dayCount = isLeapYear(year) ? MonthMaxDays.FEBRUARY_LEAP : MonthMaxDays.FEBRUARY_NON_LEAP
  } else if (realMonthIndex && !isLongMonth) {
    dayCount = MonthMaxDays.MONTH_SHORT
  } else {
    dayCount = MonthMaxDays.MONTH_LONG
  }

  return dayCount
}

const getDayArrayFromMonthAndYear = (monthIndex: number, year?: string) => {
  return generateDays(getDayCount(monthIndex, year))
}

const getNewDayIfNotLegitDate = (day: string, monthIndex: number, year?: string) => {
  const thisMonthDayCount = getDayCount(monthIndex, year)

  if (Number(day) > thisMonthDayCount) {
    return String(thisMonthDayCount)
  }

  return day
}

const getIsoDateFromParts = (day: string, month: string, year: string) => {
  return `${year}-${String(MONTH_NAMES.indexOf(month) + 1).padStart(2, '0')}-${day}`
}

export {
  generateDays,
  generateYears,
  getDayArrayFromMonthAndYear,
  getHumanMonthDayFromTimeStamp,
  getIsoDateFromParts,
  getNewDayIfNotLegitDate,
}
