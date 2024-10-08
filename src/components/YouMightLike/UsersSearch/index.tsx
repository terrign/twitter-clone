import { ChangeEvent } from 'react'
import { Search } from '@components/UI/Search'
import { useDebounceCallback } from '@hooks/useDebounceCallback'
import { UserInfo } from '@models/index'
import { useLazySearchUsersQuery } from '@store/api/users'
import { UserList } from '../UserList'

export const UsersSearch = () => {
  const [trigger, { data, isUninitialized, isLoading }] = useLazySearchUsersQuery()

  const [debouncedTrigger, abort] = useDebounceCallback(trigger, 1000)

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value) {
      debouncedTrigger(event.target.value)
    } else {
      abort()
    }
  }

  const hasResult = (data: UserInfo[] | undefined): data is UserInfo[] => {
    return Boolean(data && data.length > 0)
  }

  const renderResult = () => {
    if (hasResult(data)) {
      return (
        <>
          <p>Users</p>
          <UserList users={data} />
        </>
      )
    } else if (isUninitialized) {
      return <p>Try search for people</p>
    } else {
      return <p>Nothing found</p>
    }
  }

  return <Search placeholder="Search People" isLoading={isLoading} onChange={changeHandler} result={renderResult()} />
}
