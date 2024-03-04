import { Header, TweetForm, TweetList } from '@components'
import { useFetchAllTweetsQuery } from '@store'
import { Loader } from '@ui'

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
