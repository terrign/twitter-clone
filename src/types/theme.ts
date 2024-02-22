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
  buttonBgColor: string
  buttonBorderColor: string
  inputBorderColor: string
  bgColor: string
  outlinedButtonHover: string
  filledButtonHover: string
  modalBgColor: string
}

export { Theme, type ThemeObject }
