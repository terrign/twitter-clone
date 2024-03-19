const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    if (file) {
      fileReader.readAsDataURL(file)
    } else {
      resolve('')
    }

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
  })
}

const nicknameFromEmail = (email: string) => '@' + email.split('@')[0]

export { convertBase64, nicknameFromEmail }
