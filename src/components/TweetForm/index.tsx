import { AddImageOutlined } from '@assets'
import { storageService } from '@services'
import { setAlert, useAddTweetMutation, useAppDispatch, useAppSelector } from '@store'
import { Avatar, Button } from '@ui'
import { convertBase64 } from '@utils'
import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from 'react'

import { CloseButton, StyledTextArea, StyledTweetForm } from './styled'

const MAX_CHARACTERS = 500

export const TweetForm = () => {
  const [tweet, setTweet] = useState('')
  const [image, setImage] = useState('')
  const { photoURL } = useAppSelector((state) => state.user.user)
  const imageInputId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
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
    const file = fileInputRef.current?.files?.[0]
    let imageUploadResult: Error | string = ''

    if (file) {
      imageUploadResult = await storageService.addFile(file)

      if (imageUploadResult instanceof Error) {
        dispatch(setAlert({ type: 'error', message: imageUploadResult.message }))
      }

      return
    }

    addTweet({ text: tweet, imageURL: imageUploadResult })

    const form = event.target as HTMLFormElement

    setTweet('')
    form.reset()
    removeImage()
  }

  useEffect(() => console.log(status), [status])

  const fileInputChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) {
      return
    }

    const img = await convertBase64(files[0])
    setImage(img)
  }

  const buttonDisabed = tweet.trim().length === 0 && image.length === 0

  return (
    <StyledTweetForm>
      <div>
        <Avatar size="s" photoURL={photoURL} />
        {image && (
          <div>
            <CloseButton onClick={removeImage}>✖</CloseButton>
            <img src={image} height={50} width={50} />
          </div>
        )}
      </div>

      <form onSubmit={submitHandler}>
        <StyledTextArea>
          <textarea placeholder="What's happening" maxLength={300} onChange={tweetChangeHandler} />
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

        <Button $type="filled" disabled={buttonDisabed}>
          {status === 'pending' ? 'loading' : 'Tweet'}
        </Button>
      </form>
    </StyledTweetForm>
  )
}
