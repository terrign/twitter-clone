describe('Tweet', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it('Can create tweet and add an image', () => {
    cy.button('Tweet').click()
    cy.get('#modal input[type="file"]:hidden').selectFile('cypress/fixtures/test-image.jpg', { force: true })
    cy.wait(1000)
    cy.get('#modal textarea').type('New Test Tweet')
    cy.get('#modal').within(() => {
      cy.button('Tweet').click()
    })
    cy.get('*').contains('New Test Tweet').should('exist')
  })

  it('Can like and unlike tweet, changes applied to all pages', () => {
    cy.get('article:contains("New Test Tweet") button[name="likeButton"]').as('likeButton').click()
    cy.wait(1000)
    cy.get('@likeButton').should('have.text', '1')
    cy.get('article:contains("New Test Tweet")').contains('New Test Tweet').click()
    cy.get('@likeButton').should('have.text', '1')
    cy.get('li:contains("Home")').click()
    cy.get('@likeButton').should('have.text', '1')
    cy.get('li:contains("Profile")').click()
    cy.get('@likeButton').should('have.text', '1')

    cy.get('@likeButton').click()
    cy.wait(2000)
    cy.get('article:contains("New Test Tweet")').contains('New Test Tweet').click()
    cy.get('@likeButton').should('have.text', '0')
    cy.get('li:contains("Home")').click()
    cy.get('@likeButton').should('have.text', '0')
    cy.get('li:contains("Profile")').click()
    cy.get('@likeButton').should('have.text', '0')
  })

  it('Tweet visible on Home and Profile pages', () => {
    cy.get('li:contains("Home")').click()
    cy.get('*').contains('New Test Tweet').should('exist')
    cy.get('li:contains("Profile")').click()
    cy.get('*').contains('New Test Tweet').should('exist')
  })

  it('Clicking on tweet leads to post page', () => {
    cy.get('article:contains("New Test Tweet")').contains('New Test Tweet').click()
    cy.wait(2000)
    cy.location().should((loc) => {
      expect(loc.pathname).to.contain('post')
    })
  })

  it('Can delete tweet', () => {
    cy.get('article:contains("New Test Tweet")')
      .as('tweet')
      .within(() => {
        cy.button('...').click()
        cy.button('Delete').click()
      })

    cy.get('#modal').within(() => {
      cy.button('Delete tweet').click()
    })

    cy.get('@tweet').should('not.exist')
    cy.wait(2000)
  })
})
