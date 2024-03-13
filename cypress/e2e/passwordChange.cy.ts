import { firebaseErrorMap } from '@constants/index'
import { ValidationError } from '@utils/formValidationSchemas'

describe('Password change', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it('Shows error message on invalid password change attempt', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.fixture('./correctUserData')
      .as('user')
      .then((user) => {
        cy.get('input[name="currentPassword"]').type('{selectAll}' + user.pass_changed)
        cy.get('input[name="newPassword"]').type('{selectAll}' + user.pass)
        cy.get('input[name="confirmPassword"]').type('{selectAll}' + user.pass)
      })
    cy.button('Update').click()
    cy.wait(2000)
    cy.get('div').contains(firebaseErrorMap['auth/wrong-password'])
  })

  it('Shows validation errors', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.get('input[name="currentPassword"]').as('currentPass').type('{selectAll}asdasd')
    cy.get('span').contains(ValidationError.PASS_SHORT).should('be.visible')

    cy.get('@currentPass').type('{selectAll}123asdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@currentPass').type('{selectAll}123asAdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@currentPass').type('{selectAll}12@3asAdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('@currentPass').clear()
    cy.get('span').contains(ValidationError.PASS_REQUIRED).should('be.visible')

    cy.get('@currentPass').type('{selectAll}ASd72128*ASD57as423SDd@31')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('input[name="newPassword"]').as('newPass').type('{selectAll}asdasd')
    cy.get('span').contains(ValidationError.PASS_SHORT).should('be.visible')

    cy.get('@newPass').type('{selectAll}123asdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@newPass').type('{selectAll}123asdasdasdA@#')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('@newPass').clear()
    cy.get('span').contains(ValidationError.PASS_REQUIRED).should('be.visible')

    cy.get('@newPass').type('{selectAll}ASd72128*ASD57as423SDd@31')

    cy.get('input[name="confirmPassword"]').as('confirmPass').type('{selectAll}asdas21123')
    cy.get('span').contains(ValidationError.PASS_CONFIRM_DONT_MATCH).should('be.visible')

    cy.get('@confirmPass').clear()
    cy.get('span').contains(ValidationError.PASS_CONFIRM_REQUIRED).should('be.visible')

    cy.get('@confirmPass').type('{selectAll}ASd72128*ASD57as423SDd@31')
    cy.get('span').contains(ValidationError.PASS_CONFIRM_DONT_MATCH).should('not.exist')

    cy.get('body').trigger('keydown', { key: 'Escape' })

    cy.wait(2000)
  })

  it('Changes password, shows success message', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.fixture('./correctUserData')
      .as('user')
      .then((user) => {
        cy.get('input[name="currentPassword"]').type('{selectAll}' + user.pass)
        cy.get('input[name="newPassword"]').type('{selectAll}' + user.pass_changed)
        cy.get('input[name="confirmPassword"]').type('{selectAll}' + user.pass_changed)
      })
    cy.button('Update').click()
    cy.wait(2000)
    cy.get('div').contains('Password has been updated')

    cy.button('Edit profile').click()

    cy.fixture('./correctUserData')
      .as('user')
      .then((user) => {
        cy.get('input[name="currentPassword"]').type('{selectAll}' + user.pass_changed)
        cy.get('input[name="newPassword"]').type('{selectAll}' + user.pass)
        cy.get('input[name="confirmPassword"]').type('{selectAll}' + user.pass)
      })
    cy.button('Update').click()
  })
})
