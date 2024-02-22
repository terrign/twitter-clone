import {
  BookmarksFilled,
  BookmarksOutlined,
  ExploreFilled,
  ExploreOutlined,
  HomeFilled,
  HomeOutlined,
  ListsFilled,
  ListsOutlined,
  MessagesFilled,
  MessagesOutlined,
  More,
  NotificationFilled,
  NotificationOutlined,
  ProfileFilled,
  ProfileOutlined,
} from '@assets'
import { Route } from '@router'

export const navLinks = [
  { label: 'Home', icon: { filled: <HomeFilled />, outlined: <HomeOutlined /> }, path: Route.HOME },
  { label: 'Explore', icon: { filled: <ExploreFilled />, outlined: <ExploreOutlined /> }, path: Route.TODO },
  {
    label: 'Notifications',
    icon: { filled: <NotificationFilled />, outlined: <NotificationOutlined /> },
    path: Route.TODO,
  },
  { label: 'Messages', icon: { filled: <MessagesFilled />, outlined: <MessagesOutlined /> }, path: Route.TODO },
  { label: 'Bookmarks', icon: { filled: <BookmarksFilled />, outlined: <BookmarksOutlined /> }, path: Route.TODO },
  { label: 'Lists', icon: { filled: <ListsFilled />, outlined: <ListsOutlined /> }, path: Route.TODO },
  { label: 'Profile', icon: { filled: <ProfileFilled />, outlined: <ProfileOutlined /> }, path: Route.PROFILE },
  { label: 'More', icon: { filled: <More />, outlined: <More /> }, path: Route.TODO },
]
