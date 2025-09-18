

describe('funcionalidad de la seleccion de butacas ', () => {
    beforeEach('tests de butacas', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.get('.justify-end > .text-sm').click()
        cy.login();
    });



it('CP-06 validar que pasados los 5 minutos de espera, la reserva se venza', () => {
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[data-cy="evento-card-4"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()
        cy.get('[title="Fila 6, Columna 10"]').click()
        cy.get('.relative > .flex-col > .w-full').click()
        cy.clock()
        cy.get('.estado-reserva').should('contain', 'reserva');
        cy.tick(300000);
        cy.get('.text-sm text-red-600 font-semibold').should('contain', 'Expirada');
        cy.get('.mt-6 > .z-0').click()

    })

})