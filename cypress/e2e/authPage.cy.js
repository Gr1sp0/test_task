const cfg = require("../../local_config.json")

const username = cfg.email;
const password = cfg.password;
const incorrectUsername = 'xxx'
const incorrectPassword = 'xxx'
const inactiveUsername = 'xxx@gmail.com'
describe('Auth page', () => {

  beforeEach( () => {
    cy.visit('')
  })

  it('Should check basic lables and fields', () => {
    cy.get('[alt="Logo"]').should('exist').and('have.attr', 'src', '/assets/logo-236e9b25.svg')
    cy.contains('Welcome to Omni-dispatch TMS')
    cy.contains('Log in to your account')

    cy.get('[type="email"]').should('exist').and('be.enabled')
    cy.get('[type="email"]')
    .parent()
    .find('label').should('exist').and('contain.text', 'E-mail')

    cy.get('[type="password"]').should('exist').and('be.enabled')
    cy.get('[type="password"]')
    .parent()
    .find('label').should('exist').and('contain.text', 'Password')

    cy.get('[aria-label="Password appended action"]').should('exist').click()
    cy.get('[type="button"]').should('exist').and('be.enabled').and('contain.text', 'Log in')
    cy.contains('Forgot password').should('have.attr', 'href', '/reset-password')
    cy.contains('Support:')
    .parent()
    .find('a')
    .should('have.attr', 'href', 'mailto:info@omni-dispatch.com')
    .and('have.text', 'info@omni-dispatch.com')
  })


  it('Should check password hide button', () => {
    cy.get('[type="password"]').should('exist').click().type(password)
    cy.get('[aria-label="Password appended action"]').should('exist').click()
    cy.get('[type="text"]').should('exist')
  })

  it('Should check correct log in', () => {
    cy.get('[type="email"]').click().type(username)
    cy.get('[type="password"]').click().type(password)
    cy.get('[type="button"]').click()
    cy.contains('Test company')
  })

  it('Should check incorrect email auth', () => {
    cy.get('[type="email"]').click().type(incorrectUsername)
    cy.get('[type="password"]').click().type(password)
    cy.get('[type="button"]').click()
    cy.contains('Wrong Email or password')
  })

  it('Should check incorrect password auth', () => {
    cy.get('[type="email"]').click().type(username)
    cy.get('[type="password"]').click().type(incorrectPassword)
    cy.get('[type="button"]').click()
    cy.contains('Wrong Email or password')
  })

  it('Should check incorrect email and password auth (at one moment)', () => {
    cy.get('[type="email"]').click().type(incorrectUsername)
    cy.get('[type="password"]').click().type(incorrectPassword)
    cy.get('[type="button"]').click()
    cy.contains('Wrong Email or password')
  })

  it('Should check inactive email', () => {
    cy.get('[type="email"]').click().type(inactiveUsername)
    cy.get('[type="password"]').click().type(password)
    cy.get('[type="button"]').click()
    cy.contains('Wrong Email or password')
  })

  it('Should try to log in with appended password', () => {
    cy.get('[type="email"]').click().type(username)
    cy.get('[type="password"]').should('exist').click().type(password)
    cy.get('[aria-label="Password appended action"]').should('exist').click()
    cy.get('[type="button"]').click()
    cy.contains('Test company')
  })

  it('Should check forgot password menu', () => {
    cy.contains('Forgot password').click()
    cy.contains('Send link to email')
    cy.contains('Enter your email and we will send you a link to reset your password!')
    cy.get('[type="text"]').should('exist')
    cy.get('[type="text"]').parent()
    .find('label').should('have.text', 'Email')
    cy.get('[type="button"]').should('contain.text', 'Send link to email')
    cy.contains('Back to login').should('have.attr', 'href', '/login')
  })
})