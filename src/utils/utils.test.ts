import { firebaseErrorMap } from '@constants/index'
import {
  generateDays,
  generateYears,
  getDayArrayFromMonthAndYear,
  getDayCount,
  getIsoDateFromParts,
  getNewDayIfNotLegitDate,
  isLeapYear,
} from '@utils/date'
import { mapErrorMessage } from '@utils/mapErrorMessage'
import { newTweet } from '@utils/newTweet'
import { FirebaseError } from 'firebase/app'

describe('utils', () => {
  it('newTweet creates new tweet with all required fields', async () => {
    const tweet = newTweet({ createdById: 'id', imageURL: 'url', text: 'text' })
    expect(tweet).toHaveProperty('id')
    expect(tweet).toHaveProperty('timestamp')
    expect(tweet).toHaveProperty('likedUserIds')
    expect(tweet).toHaveProperty('createdById')
    expect(tweet).toHaveProperty('imageURL')
    expect(tweet).toHaveProperty('text')
  })

  it('map Error message works correct', async () => {
    const error = new Error('')
    const mappedError = mapErrorMessage(error)

    expect(mappedError.code).toBe('unknown error')
    expect(mappedError.message).toBe('Unknown error occured, please try to reload the page')

    const error1 = new FirebaseError('auth/email-already-in-use', 'message')

    const mappedError1 = mapErrorMessage(error1)

    expect(mappedError1.message).toBe(firebaseErrorMap['auth/email-already-in-use'])
  })
})

describe('generateYears', () => {
  it('generates 150 years', async () => {
    const years = generateYears()

    expect(years.length).toBe(150)
  })

  it('starts generate from -18 years', async () => {
    const nowYear = new Date().getFullYear()
    const years = generateYears()

    expect(years[0]).toBe(String(nowYear - 18))
  })
})

describe('generateDays', () => {
  it('generates correct day count', async () => {
    const days = generateDays(50)

    expect(days.length).toBe(50)
  })
})

describe('isLeapYear', () => {
  it('returns true if falsy value passed', async () => {
    let isLeap = isLeapYear('')
    expect(isLeap).toBeTruthy()
    isLeap = isLeapYear(undefined)
    expect(isLeap).toBeTruthy()
    isLeap = isLeapYear('2000')
    expect(isLeap).toBeTruthy()
    isLeap = isLeapYear('2024')
    expect(isLeap).toBeTruthy()
  })

  it('returns false if not leap year passed', async () => {
    let isLeap = isLeapYear('1900')
    expect(isLeap).toBe(false)

    isLeap = isLeapYear('2023')
    expect(isLeap).toBe(false)
  })

  it('returns true if leap year passed or invalid string', async () => {
    let isLeap = isLeapYear('2000')
    expect(isLeap).toBe(true)

    isLeap = isLeapYear('2024')
    expect(isLeap).toBe(true)

    isLeap = isLeapYear('invalid year')
    expect(isLeap).toBe(true)
  })
})

describe('getDayCount', () => {
  it('returns correct day count', async () => {
    let count = getDayCount(0, '2024')
    expect(count).toBe(31)
    count = getDayCount(1, '2024')
    expect(count).toBe(29)
    count = getDayCount(1, '2023')
    expect(count).toBe(28)
    count = getDayCount(3, '2023')
    expect(count).toBe(30)
  })
})

describe('getDayArrayFromMonthAndYear', () => {
  it('returns correct amount of days', async () => {
    const days = getDayArrayFromMonthAndYear(0, '2024')
    expect(days.length).toBe(31)
  })
})

describe('getNewDayIfNotLegitDate', () => {
  it('returns correct last day', async () => {
    let day = getNewDayIfNotLegitDate('31', 1, '2024')
    expect(day).toBe('29')
    day = getNewDayIfNotLegitDate('31', 1, '2023')
    expect(day).toBe('28')
    day = getNewDayIfNotLegitDate('31', 3, '2023')
    expect(day).toBe('30')
    day = getNewDayIfNotLegitDate('15', 3, '2023')
    expect(day).toBe('15')
  })
})

describe('getIsoDateFromParts', () => {
  it('returns correct last day', async () => {
    const isoDate = getIsoDateFromParts('01', 'February', '2024')

    expect(isoDate).toBe('2024-02-01')
  })
})
