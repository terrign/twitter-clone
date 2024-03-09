import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LeftArrow } from '@assets/index'
import { Tweet, UserInfo } from '@models/index'
import { Route } from '@router/types'
import { Header, StyledYouMightLike, SuggestedImage, SuggestedImages } from './styled'
import { TweetsSearch } from './TweetsSearch'
import { UserList } from './UserList'
import { UsersSearch } from './UsersSearch'

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

  const closeAside = () => toggleAside(false)

  const search = pathname.includes(Route.HOME) ? <UsersSearch /> : <TweetsSearch />

  return (
    <StyledYouMightLike>
      <Header>
        <button onClick={closeAside}>
          <LeftArrow />
        </button>
      </Header>
      {search}

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

          <UserList users={users} />
        </>
      )}
    </StyledYouMightLike>
  )
}
