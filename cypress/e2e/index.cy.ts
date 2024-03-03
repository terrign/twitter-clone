describe('SignUp', () => {
  it('Renders correct markers amount', () => {
    cy.visit('/')
    cy.get('button:contains("Sign up with Google")').click()
    cy.get('li:contains("Panda")').click()
    cy.screenshot()
  })
})
