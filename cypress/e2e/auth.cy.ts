import { firebaseErrorMap } from '@constants/index'
import { ValidationError } from '@utils/formValidationSchemas'

describe('SignUp', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
  })

  it('Email signUp works', () => {
    cy.visit('/signup')
    cy.fillSignUpFormCorrect()
    cy.button('Next').click()
    cy.button('Tweet').click()

    cy.get('#modal textarea').type('init tweet')

    cy.get('#modal').within(() => {
      cy.button('Tweet').click()
    })
    cy.get('*').contains('init tweet').should('exist')
    cy.logout()
  })

  it('Shows error if email already exists', () => {
    cy.visit('/signup')
    cy.fillSignUpFormCorrect()
    cy.get('div').contains(firebaseErrorMap['auth/email-already-in-use']).click()
  })

  it('Email signIn works', () => {
    cy.login()
    cy.logout()
  })

  it('Shows error on invalid password', () => {
    cy.visit('/signin')
    cy.get('input[placeholder="Email address"]').type('Email@gmail.com')
    cy.get('input[placeholder="Password"]').type('wrong_pass_!23#$A')
    cy.get('button').contains('Login').click()
    cy.get('div').contains(firebaseErrorMap['auth/invalid-credential'])
  })

  it('Shows error on invalid email', () => {
    cy.visit('/signin')
    cy.get('input[placeholder="Email address"]').type('invalid_email@gmail.com')
    cy.get('input[placeholder="Password"]').type('wrong_pass_!23#$A')
    cy.get('button:contains("Login")').click()
    cy.get('div').contains(firebaseErrorMap['auth/invalid-credential'])
  })

  it('Shows validation erorrs', () => {
    cy.visit('/signup')
    cy.button('Next').click()
    cy.get('*').contains(ValidationError.EMAIL_REQUIRED)
    cy.get('*').contains(ValidationError.NAME_REQUIRED)
    cy.get('*').contains(ValidationError.PASS_CONFIRM_REQUIRED)
    cy.get('*').contains(ValidationError.PASS_REQUIRED)
    cy.get('*').contains(ValidationError.PHONE_REQUIRED)
    cy.get('*').contains(ValidationError.DATE_MONTH)
    cy.selectMonth()
    cy.get('*').contains(ValidationError.DATE_DAY)
    cy.selectDay()
    cy.get('*').contains(ValidationError.DATE_YEAR)
    cy.selectYear()
    cy.get('*').contains(ValidationError.DATE_YEAR).should('not.exist')
    cy.fillSignUpFormInCorrect()
    cy.get('*').contains(ValidationError.INVALID_EMAIL)
    cy.get('*').contains(ValidationError.NAME_NO_SPECIAL)
    cy.get('*').contains(ValidationError.PASS_CONFIRM_DONT_MATCH)
    cy.get('*').contains(ValidationError.PHONE_INVALID)
    cy.get('*').contains(ValidationError.PASS_WEAK)

    cy.fixture('./inCorrectUserData')
      .as('user')
      .then((user) => {
        cy.get('input[placeholder="Password"]').as('pass').clear().type(user.pass_short)
        cy.get('*').contains(ValidationError.PASS_SHORT)
        cy.get('@pass').type(user.pass_short)
        cy.get('*').contains(ValidationError.PASS_SHORT)
        cy.get('input[placeholder="Name"]').clear().type(user.name_long)
        cy.get('*').contains(ValidationError.NAME_LONG)
      })
  })
})
