import { ChangeEvent, FormEvent, useId, useState } from 'react'
import { AddImageOutlined, TweetButtonIcon } from '@assets'
import { Color } from '@constants'
import { storageService } from '@services'
import { setAlert, useAddTweetMutation, useAppDispatch, useAppSelector } from '@store'
import { Avatar, Loader } from '@ui'
import { convertBase64, newTweet } from '@utils'
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

  const [isImageLoading, setIsImageLoading] = useState(false)

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
      setIsImageLoading(true)
      imageUploadResult = await storageService.addFile(file)

      if (imageUploadResult instanceof Error) {
        dispatch(setAlert({ type: 'error', message: imageUploadResult.message }))

        return
      }
    }

    setIsImageLoading(false)

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
        <Avatar size="s" photoURL={photoURL} />
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

        <TweetFormSubmitButton $type="filled" disabled={buttonDisabed}>
          {isLoading || isImageLoading ? <Loader size="s" color={Color.WHITE} /> : <span>Tweet</span>}
          <TweetButtonIcon />
        </TweetFormSubmitButton>
      </form>
    </StyledTweetForm>
  )
}
