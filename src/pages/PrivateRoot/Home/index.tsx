import { Header } from '@components/Header'
import { TweetForm } from '@components/TweetForm'
import { TweetList } from '@components/TweetList'
import { Loader } from '@components/UI/Loader'
import { useFetchAllTweetsQuery } from '@store/api/tweets'

export const Home = () => {
  const { data, isFetching } = useFetchAllTweetsQuery({})

  return (
    <>
      <Header>Home</Header>
      <TweetForm />
      {isFetching && <Loader />}
      {data && <TweetList tweets={data} />}
    </>
  )
}
