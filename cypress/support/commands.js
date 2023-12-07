Cypress.Commands.add('login', (username, password) => { 
    cy.visit('')
    cy.get('[type="email"]').click().type(username)
    cy.get('[type="password"]').click().type(password)
    cy.get('[type="button"]').click()
 })
