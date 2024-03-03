import { useEffect } from 'react'
// import { ChangeEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LeftArrow } from '@assets'
// import { useDebounceCallback } from '@hooks'
import { Route } from '@router'
// import { useSearchTweetQuery } from '@store'
import { Tweet, UserInfo } from '@types'
import { SearchInput, UserCard } from '@ui'
import { FollowButton, Header, StyledYouMightLike, SuggestedImage, SuggestedImages, SuggestedUsers } from './styled'

interface Props {
  tweets?: Tweet[]
  users?: UserInfo[]
  toggleAside: (close?: false) => void
}

export const YouMightLike = ({ users, tweets, toggleAside }: Props) => {
  const { pathname } = useLocation()

  useEffect(() => {
    toggleAside(false)
  }, [pathname])

  // const [slug, setSlug] = useState('')
  // const debouncedSetSlug = useDebounceCallback(setSlug, 1000)

  // // const result = useSearchTweetQuery(slug)

  // const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   // debouncedSetSlug(event.target.value)
  // }

  // // console.log(slug)

  // // console.log(result.data)

  const closeAside = () => toggleAside(false)

  return (
    <StyledYouMightLike>
      <Header>
        <button>
          <LeftArrow onClick={closeAside} />
        </button>
        <SearchInput>
          <input placeholder="Search people" />
        </SearchInput>
      </Header>

      {users && tweets && (
        <>
          <SuggestedImages>
            {tweets.map(({ imageURL, id }) => {
              return (
                <Link to={`${Route.POST}/${id}`} key={id}>
                  <SuggestedImage $url={imageURL} />
                </Link>
              )
            })}
          </SuggestedImages>
          <h3>You might like</h3>
          <SuggestedUsers>
            {users.map(({ photoURL, name, email, uid }) => {
              return (
                <div key={uid}>
                  <UserCard url={photoURL} name={name} email={email} uid={uid} link />
                  <FollowButton $type="filled">Follow</FollowButton>
                </div>
              )
            })}
          </SuggestedUsers>
        </>
      )}
    </StyledYouMightLike>
  )
}
