
Cypress.Commands.add('login', (email, password) => {

cy.get('[data-cy="email-input"]').type(email)
cy.get('#username').type('Ceci')
cy.get('input[type="password"]').eq(0).type(password)
cy.get('.shadow-sm').eq(3).type(password)

})
