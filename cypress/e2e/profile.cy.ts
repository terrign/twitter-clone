import { ValidationError } from '@utils/formValidationSchemas'

const LONG_STRING = 'qwerty'.repeat(11)

describe('Profile', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it('Edit profile opens and closes', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').as('openButton').click()
    cy.get('h3').contains('Edit profile').should('exist')
    cy.get('button[aria-label="close modal"]').click()
    cy.get('h3').contains('Edit profile').should('not.exist')
    cy.get('@openButton').click()
    cy.get('body').trigger('keydown', { key: 'Escape' })
    cy.get('h3').contains('Edit profile').should('not.exist')
  })

  it('Edit profile form shows validation errors', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').as('openButton').click()
    cy.get('input[name="name"]').as('name').type(LONG_STRING)
    cy.get('*').contains(ValidationError.LONG).should('be.visible')

    cy.get('@name').clear()
    cy.get('*').contains(ValidationError.NAME_REQUIRED).should('be.visible')

    cy.get('@name').type('test_name')
    cy.get('*').contains(ValidationError.NAME_NO_SPECIAL).should('be.visible')
    cy.get('@name').clear().type('testName')

    cy.get('input[name="bio"]').as('bio').type(LONG_STRING)
    cy.get('*').contains(ValidationError.LONG).should('be.visible')
    cy.get('@bio').clear()

    cy.get('input[name="tgLink"]').as('tgLink').type('test')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('be.visible')
    cy.get('@tgLink').clear().type('https://t.me/test_tg')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('not.exist')
    cy.get('@tgLink').clear().type('https://t.me/test-tg')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('be.visible')
    cy.get('@tgLink').clear().type('https://t.me/test___123123123123')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('not.exist')
    cy.get('@tgLink').clear().type('https://t.me/123123123123123!')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('be.visible')
    cy.get('@tgLink').clear().type('https://t.me/asddasd$')
    cy.get('*').contains(ValidationError.INVALID_TG_LINK).should('be.visible')
    cy.get('body').trigger('keydown', { key: 'Escape' })

    cy.fixture('./correctUserData').then((user) => {
      cy.get('input[name="currentPassword"]').clear().type(user.pass)
    })

    cy.get('input[name="newPassword"]').clear().type('test bio')
    cy.get('input[name="confirmPassword"]').clear().type('https://t.me/test_tg')
  })

  it('Updates profile info', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.get('input[name="name"]').clear().type('testName')
    cy.get('input[name="bio"]').clear().type('test bio')
    cy.get('input[name="tgLink"]').clear().type('https://t.me/test_tg')
    cy.button('Save').click()
    cy.get('p').contains('testName').should('exist')
    cy.get('p').contains('test bio').should('exist')
    cy.get('a[href="https://t.me/test_tg"]').should('exist')
  })

  it('Can update profile image', () => {
    cy.get('li:contains("Profile")').click()
    cy.button('Edit profile').click()

    cy.fixture('test-image.jpg').as('image')
    cy.get('#modal input[type="file"]:hidden').selectFile('cypress/fixtures/test-image.jpg', { force: true })
    cy.wait(2000)
    cy.button('Save').click()
    cy.get('[data-testid="profileAvatar"] > div:first-child').should(
      'not.have.css',
      'background-image',
      'url(/src/assets/default-avatar.png)',
    )
  })
})
