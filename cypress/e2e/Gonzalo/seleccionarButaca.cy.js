
describe('funcionalidad de la seleccion de butacas ', () => {
    beforeEach('tests de butacas', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.get('.justify-end > .text-sm').click()
        cy.login();
    });

    it('CP-02 seleccionar una butaca en la sala ', () => {

        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[data-cy="evento-card-4"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()
        cy.get('[title="Fila 6, Columna 10"]').click()
        cy.get('.mt-2 > .px-2').should('be.visible')
    })


    it('CP-03 seleccionar el maximo de butacas por compra', () => {
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[data-cy="evento-card-4"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()
        cy.get('[title="Fila 6, Columna 3"]').click()
        cy.get('[title="Fila 8, Columna 5"]').click()
        cy.get('[title="Fila 9, Columna 10"]').click()
        cy.get('[title="Fila 11, Columna 21"]').click()
        cy.get('.relative > .text-red-600').should('be.visible')
    })


    it('CP-04 seleccionar el maximo de butacas pero que esten separadas', () => {
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[data-cy="evento-card-4"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()
        cy.get('[title="Fila 6, Columna 3"]').click()
        cy.get('[title="Fila 8, Columna 5"]').click()
        cy.get('[title="Fila 9, Columna 10"]').click()
        cy.get('[title="Fila 11, Columna 21"]').click()
        cy.get('.relative > .text-red-600').should('be.visible')
    })


    it('CP-05 no permite seleccionar una butaca ya vendida', () => {
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[data-cy="evento-card-4"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-4"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()
        cy.get('[title="Fila 1, Columna 5"]').click()

    })


    
})


