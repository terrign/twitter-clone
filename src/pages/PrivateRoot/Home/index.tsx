import { Header, TweetForm, TweetList } from '@components'
import { useFetchAllTweetsQuery } from '@store'

export const Home = () => {
  const tweets = useFetchAllTweetsQuery({})

  return (
    <>
      <Header>Home</Header>
      <TweetForm />
      {tweets.data && <TweetList tweets={tweets.data} />}
    </>
  )
}
