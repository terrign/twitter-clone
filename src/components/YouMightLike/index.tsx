import { Tweet, UserInfo } from '@types'
import { SearchInput, UserCard } from '@ui'

import { FollowButton, StyledYouMightLike, SuggestedImage, SuggestedImages, SuggestedUsers } from './styled'

interface Props {
  tweets?: Tweet[]
  users?: UserInfo[]
}

export const YouMightLike = ({ users, tweets }: Props) => {
  return (
    <StyledYouMightLike>
      <SearchInput>
        <input placeholder="Search people" />
      </SearchInput>
      {tweets && (
        <SuggestedImages>
          {tweets.map(({ imageURL, id }) => {
            return <SuggestedImage $url={imageURL} key={id} />
          })}
        </SuggestedImages>
      )}
      <h3>You might like</h3>

      {users && (
        <SuggestedUsers>
          {users.map(({ photoURL, name, email, uid }) => {
            return (
              <div key={uid}>
                <UserCard url={photoURL} name={name} email={email} />
                <FollowButton $type="filled">Follow</FollowButton>
              </div>
            )
          })}
        </SuggestedUsers>
      )}
    </StyledYouMightLike>
  )
}
