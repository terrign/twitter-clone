import { AddImageOutlined, TweetButtonIcon } from '@assets'
import { storageService } from '@services'
import { setAlert, useAddTweetMutation, useAppDispatch, useAppSelector } from '@store'
import { Avatar } from '@ui'
import { convertBase64 } from '@utils'
import { ChangeEvent, FormEvent, useId, useState } from 'react'

import { AddedImage, CloseButton, FirstColumn, StyledTextArea, StyledTweetForm, TweetFormSubmitButton } from './styled'

const MAX_CHARACTERS = 500

export const TweetForm = () => {
  const [tweet, setTweet] = useState('')
  const [image, setImage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const { photoURL } = useAppSelector((state) => state.user.user)
  const imageInputId = useId()
  const dispatch = useAppDispatch()
  const [addTweet, { status }] = useAddTweetMutation()

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
      imageUploadResult = await storageService.addFile(file)

      if (imageUploadResult instanceof Error) {
        dispatch(setAlert({ type: 'error', message: imageUploadResult.message }))

        return
      }
    }

    addTweet({ text: tweet, imageURL: imageUploadResult }).then(() => {
      setTweet('')
      setFile(null)
      removeImage()
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

  const buttonDisabed = (tweet.trim().length === 0 && image.length === 0) || status === 'pending'

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
          <span>Tweet</span>
          <TweetButtonIcon />
        </TweetFormSubmitButton>
      </form>
    </StyledTweetForm>
  )
}
