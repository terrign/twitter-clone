import { ChangeEvent } from 'react'
import { TweetList } from '@components/TweetList'
import { Search } from '@components/UI/Search'
import { useDebounceCallback } from '@hooks/useDebounceCallback'
import { Tweet } from '@models/index'
import { useLazySearchTweetQuery } from '@store/api/tweets'

export const TweetsSearch = () => {
  const [trigger, { data, isUninitialized, isLoading }] = useLazySearchTweetQuery()

  const [debouncedTrigger, abort] = useDebounceCallback(trigger, 1000)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value) {
      debouncedTrigger(event.target.value)
    } else {
      abort()
    }
  }

  const hasResult = (data: Tweet[] | undefined): data is Tweet[] => {
    return Boolean(data && data.length > 0)
  }

  const renderResult = () => {
    if (hasResult(data)) {
      return (
        <>
          <p>Tweets</p>
          <TweetList tweets={data} compact />
        </>
      )
    }

    if (isUninitialized) {
      return <p>Try search for tweets</p>
    }

    return <p>Nothing found</p>
  }

  return <Search placeholder="Search Twitter" isLoading={isLoading} onChange={changeHandler} result={renderResult()} />
}
