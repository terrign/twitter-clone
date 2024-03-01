const enum Theme {
  LIGHT,
  DARK,
}

interface ThemeObject {
  fontXXL: string
  fontXL: string
  fontL: string
  fontM: string
  fontS: string
  fontXS: string
  bgColor: string
  modalBgColor: string
  buttonBgColor: string
  disabledButtonBgColor: string
  simpleButtonBgHover: string
  fontColor: string
  buttonBorderColor: string
  borderColor: string
  fontColorSecondary: string
  inputBorderColor: string
  reverseFontColor: string
  fontColorTertiary: string
  reverseBgColor: string

  outlinedButtonHover: string
  filledButtonHover: string
}

export { Theme, type ThemeObject }
