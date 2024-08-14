import { Route } from 'react-router-dom'
import { Post } from '@pages/PrivateRoot/Post'
import { tweetService } from '@services/Tweets'
import { store } from '@store/index'
import { setUser } from '@store/slices/user'
import { mockUserList } from '@test/__mocks__/userList'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('Post page', () => {
  const user = mockUserList[1]
  store.dispatch(setUser(user))
  const tweetId = '7f0ed70f-7351-403f-a5a3-5f9d57a3cae6'

  it('Can delete tweet if tweet belongs to user ', async () => {
    render(
      <Wrappers routerEntries={[`/post/${tweetId}`]}>
        <Route path="/" element={<div />} />
        <Route path="/home" element={<div />} />
        <Route path="post/:tweetId" element={<Post />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.getByText('...')).toBeInTheDocument())
    fireEvent.click(screen.getByText('...'))
    fireEvent.click(screen.getByText('Delete'))
    fireEvent.click(screen.getByText('Delete tweet'))
    await waitFor(() => expect(tweetService.deleteTweet).toHaveBeenCalledWith(tweetId))
  })

  it('Can unlike tweet', async () => {
    render(
      <Wrappers routerEntries={[`/post/${tweetId}`]}>
        <Route path="/" element={<div />} />
        <Route path="/home" element={<div />} />
        <Route path="post/:tweetId" element={<Post />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument())

    fireEvent.click(screen.getByText('1'))

    await waitFor(() => expect(screen.getByText('0')).toBeInTheDocument())

    await waitFor(() => expect(tweetService.unlikeTweet).toHaveBeenCalledWith(tweetId, user.uid))
  })

  it('Can like tweet', async () => {
    const zeroLikesTweet = 'ad85905d-5886-4022-b415-cd799bdada8a'

    render(
      <Wrappers routerEntries={[`/post/${zeroLikesTweet}`]}>
        <Route path="/" element={<div />} />
        <Route path="/home" element={<div />} />
        <Route path="post/:tweetId" element={<Post />} />
      </Wrappers>,
    )

    await waitFor(() => expect(screen.getByText('0')).toBeInTheDocument())

    fireEvent.click(screen.getByText('0'))

    await waitFor(() => expect(screen.getByText('1')).toBeInTheDocument())

    await waitFor(() => expect(tweetService.likeTweet).toHaveBeenCalledWith(zeroLikesTweet, user.uid))
  })
})
