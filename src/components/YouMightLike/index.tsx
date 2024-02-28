import { LeftArrow } from '@assets'
import { Tweet, UserInfo } from '@types'
import { SearchInput, UserCard } from '@ui'

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
          return <SuggestedImage $url={imageURL} key={id} />
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
