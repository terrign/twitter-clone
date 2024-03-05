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
