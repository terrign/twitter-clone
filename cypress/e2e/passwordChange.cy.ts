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
        cy.get('input[name="currentPassword"]').clear().type(user.pass_changed)
        cy.get('input[name="newPassword"]').clear().type(user.pass_changed)
        cy.get('input[name="confirmPassword"]').clear().type(user.pass_changed)
      })
    cy.button('Update').click()
    cy.wait(2000)
    cy.get('div').contains(firebaseErrorMap['auth/wrong-password'])
  })

  it('Shows validation errors', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.get('input[name="currentPassword"]').as('currentPass').clear().type('asdasd')
    cy.get('span').contains(ValidationError.PASS_SHORT).should('be.visible')

    cy.get('@currentPass').clear().type('123asdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@currentPass').clear().type('123asAdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@currentPass').clear().type('12@3asAdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('@currentPass').clear()
    cy.get('span').contains(ValidationError.PASS_REQUIRED).should('be.visible')

    cy.get('@currentPass').clear().type('ASd72128*ASD57as423SDd@31')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('input[name="newPassword"]').as('newPass').clear().type('asdasd')
    cy.get('span').contains(ValidationError.PASS_SHORT).should('be.visible')

    cy.get('@newPass').clear().type('123asdasdasd')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('be.visible')

    cy.get('@newPass').clear().type('123asdasdasdA@#')
    cy.get('span').contains(ValidationError.PASS_WEAK).should('not.exist')

    cy.get('@newPass').clear()
    cy.get('span').contains(ValidationError.PASS_REQUIRED).should('be.visible')

    cy.get('@newPass').clear().type('ASd72128*ASD57as423SDd@31')

    cy.get('input[name="confirmPassword"]').as('confirmPass').clear().type('asdas21123')
    cy.get('span').contains(ValidationError.PASS_CONFIRM_DONT_MATCH).should('be.visible')

    cy.get('@confirmPass').clear()
    cy.get('span').contains(ValidationError.PASS_CONFIRM_REQUIRED).should('be.visible')

    cy.get('@confirmPass').clear().type('ASd72128*ASD57as423SDd@31')
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
        cy.get('input[name="currentPassword"]').clear().type(user.pass)
        cy.get('input[name="newPassword"]').clear().type(user.pass_changed)
        cy.get('input[name="confirmPassword"]').clear().type(user.pass_changed)
      })
    cy.button('Update').click()
    cy.wait(2000)
    cy.get('div').contains('Password has been updated')

    cy.button('Edit profile').click()

    cy.fixture('./correctUserData')
      .as('user')
      .then((user) => {
        cy.get('input[name="currentPassword"]').clear().type(user.pass_changed)
        cy.get('input[name="newPassword"]').clear().type(user.pass)
        cy.get('input[name="confirmPassword"]').clear().type(user.pass)
      })
    cy.button('Update').click()
  })
})
