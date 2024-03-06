/// <reference types="cypress" />

const testUserIncorrect = {
  name: '2asd',
  email: 'asd',
  tel: 'tel',
  pass: '123',
}

declare namespace Cypress {
  interface Chainable {
    fillSignUpFormCorrect(): Chainable
    fillSignUpFormInCorrect(): Chainable
    selectMonth(): Chainable
    selectDay(): Chainable
    selectYear(): Chainable
    login(): Chainable
    logout(): Chainable
    button(text: string): Chainable
  }
}

Cypress.Commands.add('selectMonth', () => {
  cy.get('input[placeholder="Month"]').click()
  cy.get('button:contains("January")').click()
})

Cypress.Commands.add('selectDay', () => {
  cy.get('input[placeholder="Day"]').click()
  cy.get('button:contains("02")').click()
})

Cypress.Commands.add('selectYear', () => {
  cy.get('input[placeholder="Year"]').click()
  cy.get('button:contains("2010")').click()
})

Cypress.Commands.add('fillSignUpFormCorrect', () => {
  cy.fixture('./correctUserData')
    .as('user')
    .then((user) => {
      cy.get('input[placeholder="Name"]').type(user.name)
      cy.get('input[placeholder="Email"]').type(user.email)
      cy.get('input[placeholder="Phone number"]').type(user.tel)
      cy.get('input[placeholder="Password"]').type(user.pass)
      cy.get('input[placeholder="Confirm password"]').type(user.pass)
    })

  cy.selectMonth()
  cy.selectDay()
  cy.selectYear()
})

Cypress.Commands.add('fillSignUpFormInCorrect', () => {
  cy.fixture('./inCorrectUserData')
    .as('user')
    .then((user) => {
      cy.get('input[placeholder="Name"]').type(user.name)
      cy.get('input[placeholder="Email"]').type(user.email)
      cy.get('input[placeholder="Phone number"]').type(user.tel)
      cy.get('input[placeholder="Password"]').type(user.pass_weak)
      cy.get('input[placeholder="Confirm password"]').type(user.pass_weak + 'asd')
    })
})

Cypress.Commands.add('login', () => {
  cy.visit('/')
  cy.get('a:contains("Log in")').click()
  cy.fixture('./correctUserData').then((user) => {
    cy.get('input[placeholder="Email address"]').type(user.email)
    cy.get('input[placeholder="Password"]').type(user.pass)
  })

  cy.button('Login').click()
  cy.wait(2000)
})

Cypress.Commands.add('button', (text: string) => {
  cy.get('button').contains(text)
})

Cypress.Commands.add('logout', () => {
  cy.wait(2000)
  cy.button('Log out').click()
})
