

describe('HAppyPath-Direccion a UI',{testIsolation : false},()=> {


it('Completo datos fallidos', () => {
cy.visit('https://endearing-lollipop-19f16d.netlify.app/')

cy.get('[data-cy="nav-interacciones-ui"]').click() 
const email = 'miEmai@gmail.com'
const password = '12345678'
cy.login(email, password)
cy.get('[data-cy="role-select"]').select('Manager')
cy.contains('sms').click()
//cy.get('[data-cy="interaction-form"]').contains('Push').click()
//cy.contains('accept').click()
cy.get('[data-cy="submit-button"]').should('be.enabled')
cy.get('[data-cy="submit-button"]').click()

cy.get('[data-cy="terms-error"]').should('be.visible')
cy.contains('accept').click()

cy.get('[data-cy="submit-button"]').click()

})

it('Validar el submit', () => {
  cy.get('.text-green-700').contains('Form submitted successfully!').should('be.visible')

})

})
