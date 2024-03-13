import { LINKS } from '@constants/index'

const { cookie, privacy, terms } = LINKS

export const config = {
  header: 'Happening Now',
  subHeader: 'Join Twitter today',
  googleButtonLabel: 'Sign up with Google',
  emailButtonLabel: 'Sign up with email',
  termsText: (
    <>
      By singing up you agree to the <a href={terms.href}>{terms.label}</a> and{' '}
      <a href={privacy.href}>{privacy.label}</a>, including <a href={cookie.href}>{cookie.label}</a>.
    </>
  ),
  loginQuestion: 'Already have an account?',
  loginLinkLabel: 'Log in',
}
