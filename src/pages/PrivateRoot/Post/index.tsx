import { Header, TweetCard } from '@components'
import { useFetchTweetQuery, useGetUserByIdQuery } from '@store'
import { useLoaderData } from 'react-router-dom'

export const Post = () => {
  const { tweetId, createdById } = useLoaderData() as { tweetId: string; createdById: string }

  const tweet = useFetchTweetQuery(tweetId)

  const user = useGetUserByIdQuery(createdById)

  console.log(user.data?.uid, tweet.data?.likedUserIds)

  return (
    <section>
      <Header>Post</Header>
      {tweet.data && user.data && <TweetCard tweet={tweet.data} createdByInfo={user.data} />}
    </section>
  )
}
