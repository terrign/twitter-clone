import { ChangeEvent, FormEvent, useId, useState } from 'react'
import { AddImageOutlined, TweetButtonIcon } from '@assets/index'
import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { ButtonType } from '@components/UI/Button'
import { Loader, LoaderSize } from '@components/UI/Loader'
import { Color } from '@constants/styles'
import { useBooleanState } from '@hooks/useBooleanState'
import { storageService } from '@services/Storage'
import { useAddTweetMutation } from '@store/api/tweets'
import { useAppDispatch, useAppSelector } from '@store/index'
import { setAlert } from '@store/slices/alert'
import { convertBase64 } from '@utils/index'
import { newTweet } from '@utils/newTweet'
import { AddedImage, CloseButton, FirstColumn, StyledTextArea, StyledTweetForm, TweetFormSubmitButton } from './styled'

const MAX_CHARACTERS = 500

export const TweetForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [tweet, setTweet] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const { photoURL, uid } = useAppSelector((state) => state.user.user)
  const imageInputId = useId()
  const dispatch = useAppDispatch()
  const [addTweet, { isLoading }] = useAddTweetMutation()

  const [loaderVisible, , showLoader, hideLoader] = useBooleanState(false)

  const tweetChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value)
  }

  const removeImage = () => {
    setImage('')
  }

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()
    let imageUploadResult: Error | string = ''

    if (file) {
      showLoader()
      imageUploadResult = await storageService.addFile(file)

      if (imageUploadResult instanceof Error) {
        dispatch(setAlert({ type: 'error', message: imageUploadResult.message }))

        return
      }
    }

    hideLoader()

    addTweet(newTweet({ text: tweet, imageURL: imageUploadResult, createdById: uid })).then(() => {
      setTweet('')
      setFile(null)
      removeImage()
      onSubmit && onSubmit()
    })
  }

  const fileInputChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const img = await convertBase64(files[0])
    setImage(img)
    setFile(files[0])
  }

  const buttonDisabed = tweet.trim().length === 0 && image.length === 0

  return (
    <StyledTweetForm>
      <FirstColumn>
        <Avatar size={AvatarSize.SMALL} photoURL={photoURL} />
        {image && (
          <AddedImage>
            <CloseButton onClick={removeImage}>✖</CloseButton>
            <img src={image} height={50} width={50} />
          </AddedImage>
        )}
      </FirstColumn>

      <form onSubmit={submitHandler}>
        <StyledTextArea>
          <textarea placeholder="What's happening" maxLength={500} onChange={tweetChangeHandler} value={tweet} />
          <div>
            <label htmlFor={imageInputId}>
              <AddImageOutlined />
              <input type="file" hidden accept="image/*" id={imageInputId} onChange={fileInputChangeHandler} />
            </label>

            <span>
              {tweet.length} / {MAX_CHARACTERS}
            </span>
          </div>
        </StyledTextArea>

        <TweetFormSubmitButton $type={ButtonType.FILLED} disabled={buttonDisabed}>
          {isLoading || loaderVisible ? <Loader size={LoaderSize.SMALL} color={Color.WHITE} /> : <span>Tweet</span>}
          <TweetButtonIcon />
        </TweetFormSubmitButton>
      </form>
    </StyledTweetForm>
  )
}
