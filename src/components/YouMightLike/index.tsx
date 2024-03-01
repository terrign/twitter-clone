import { LeftArrow } from '@assets'
// import { useDebounceCallback } from '@hooks'
import { Route } from '@router'
// import { useSearchTweetQuery } from '@store'
import { Tweet, UserInfo } from '@types'
import { SearchInput, UserCard } from '@ui'
// import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { FollowButton, Header, StyledYouMightLike, SuggestedImage, SuggestedImages, SuggestedUsers } from './styled'

interface Props {
  tweets?: Tweet[]
  users?: UserInfo[]
  toggleAside: () => void
}

export const YouMightLike = ({ users, tweets, toggleAside }: Props) => {
  // const [slug, setSlug] = useState('')
  // const debouncedSetSlug = useDebounceCallback(setSlug, 1000)

  // // const result = useSearchTweetQuery(slug)

  // const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   // debouncedSetSlug(event.target.value)
  // }

  // // console.log(slug)

  // // console.log(result.data)

  return (
    <StyledYouMightLike>
      <Header>
        <button>
          <LeftArrow onClick={toggleAside} />
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
                  <UserCard url={photoURL} name={name} email={email} uid={uid} />
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
