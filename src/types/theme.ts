const enum Theme {
  LIGHT,
  DARK,
}

interface ThemeObject extends Record<string, string> {
  fontXXL: string
  fontXL: string
  fontL: string
  fontM: string
  fontS: string
  fontXS: string
  buttonBgColorBlue: string
  buttonBorderColor: string
}

export { Theme, type ThemeObject }
