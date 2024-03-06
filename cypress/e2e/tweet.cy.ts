// import { Route } from '@router/types'

describe('Tweet', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
  })

  it('Can create tweet', () => {
    cy.login()

    cy.button('Tweet').click()

    cy.get('#modal textarea').type('New Test Tweet')

    cy.get('#modal').within(() => {
      cy.button('Tweet').click()
    })
    cy.get('*').contains('New Test Tweet').should('exist')
    cy.logout()
  })

  it('Tweet visible on Home and profile pages', () => {
    cy.login()

    cy.get('li:contains("Home")').click()
    cy.get('*').contains('New Test Tweet').should('exist')
    cy.get('li:contains("Profile")').click()
    cy.get('*').contains('New Test Tweet').should('exist')
    cy.logout()
  })

  it('Clicking on tweet leads to post page', () => {
    cy.login()

    cy.get('article:contains("New Test Tweet")').contains('New Test Tweet').click()
    cy.wait(5000)
    cy.location().should((loc) => {
      expect(loc.pathname).to.contain('post')
    })
    cy.logout()
  })

  it('Can delete tweet', () => {
    cy.login()

    cy.get('article:contains("New Test Tweet")')
      .as('tweet')
      .within(() => {
        cy.button('...').click()
        cy.button('Delete').click()
      })

    cy.get('@tweet').should('not.exist')
    cy.logout()
  })
})
