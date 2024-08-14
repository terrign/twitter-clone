import { useParams } from 'react-router-dom'
import { Header } from '@components/Header'
import { TweetCard } from '@components/TweetCard'
import { Loader } from '@components/UI/Loader'
import { useBooleanState } from '@hooks/useBooleanState'
import { useFetchTweetQuery } from '@store/api/tweets'
import { useGetUserByIdQuery } from '@store/api/users'

export const Post = () => {
  const { tweetId } = useParams<{ tweetId: string }>()
  const [skipQueries, , , initQueries] = useBooleanState(true)
  const tweet = useFetchTweetQuery(tweetId, { skip: skipQueries })
  const user = useGetUserByIdQuery(tweet.data?.createdById, { skip: skipQueries })

  if (skipQueries) {
    initQueries()
  }

  if (tweet.isFetching || user.isFetching) {
    return <Loader h="200px" />
  }

  const exists = Boolean(tweet.data && user.data)

  return (
    <section>
      <Header>Post</Header>
      {!exists && <h3>Post has been removed or never existed</h3>}
      {exists && <TweetCard tweet={tweet.data!} createdByInfo={user.data!} key={tweet.data?.id} />}
    </section>
  )
}
