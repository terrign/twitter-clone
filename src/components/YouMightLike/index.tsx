import { LeftArrow } from '@assets'
import { Route } from '@router'
import { Tweet, UserInfo } from '@types'
import { SearchInput, UserCard } from '@ui'
import { Link } from 'react-router-dom'

import { FollowButton, Header, StyledYouMightLike, SuggestedImage, SuggestedImages, SuggestedUsers } from './styled'

interface Props {
  tweets?: Tweet[]
  users?: UserInfo[]
  toggleAside: () => void
}

export const YouMightLike = ({ users, tweets, toggleAside }: Props) => {
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

      <SuggestedImages>
        {tweets?.map(({ imageURL, id }) => {
          return (
            <Link to={`${Route.POST}/${id}`} key={id}>
              <SuggestedImage $url={imageURL} />
            </Link>
          )
        })}
      </SuggestedImages>

      <h3>You might like</h3>

      <SuggestedUsers>
        {users?.map(({ photoURL, name, email, uid }) => {
          return (
            <div key={uid}>
              <UserCard url={photoURL} name={name} email={email} />
              <FollowButton $type="filled">Follow</FollowButton>
            </div>
          )
        })}
      </SuggestedUsers>
    </StyledYouMightLike>
  )
}
