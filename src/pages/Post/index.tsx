import { Header, TweetCard } from '@components'
import { Tweet, UserInfo } from '@types'
import { useLoaderData } from 'react-router-dom'

export const Post = () => {
  const data = useLoaderData() as { tweet: Tweet; user: UserInfo }

  return (
    <section>
      <Header>Post</Header>
      <TweetCard tweet={data.tweet} createdByInfo={data.user} />
    </section>
  )
}
