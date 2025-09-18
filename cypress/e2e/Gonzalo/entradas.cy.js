describe('compra de entradas', () => {
    it('compra de entradas con mercado pago ', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/')

        cy.wait(2000)
        cy.get('.justify-end > .text-sm').click();
        cy.get('[data-cy="input-email"]').clear().type('gonzalolpb5@gmail.com');
        cy.get('[data-cy="input-password"]').clear().type('#Protocolo90');
        cy.get('[data-cy="btn-login"]').click();
        cy.get('[data-cy="evento-card-1"]').should('be.visible')
        cy.get('[data-cy="btn-ver-evento-1"]').click()
        cy.get('[type="button"]').contains('Adquirir entrada').click()
        cy.get('.px-2').eq(3).click()
        cy.get('.p-4 > .gap-4 > :nth-child(3)').click()
        cy.get('.mt-6 > .w-full').click()
        cy.get('.group > .font-inherit').click()
        cy.get(':nth-child(4) > :nth-child(1) > .z-0').click()
        /* cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => { win.location.href = url });
        });
        cy.wait(4000)
        cy.origin('https://www.mercadopago.com.ar', () => {
        cy.url().should('include', '/checkout/v1/payment/redirect/');
        cy.get('.andes-list').eq(0).click()

        }); */
    });

    



})