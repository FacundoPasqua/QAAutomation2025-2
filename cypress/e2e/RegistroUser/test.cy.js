// cypress/e2e/registro.cy.js
/// <reference types="cypress" />

// Opcional: cambiá esta URL si lo corrés contra prod/dev

// cypress/e2e/registro.cy.js

const REGISTER_URL = 'https://ticketazo.com.ar/auth/registerUser';
// Ajustá este patrón para tu API real (ej: '**/api/**/register*' o '**/auth/**/register*')
const REGISTER_API_PATTERN = 'api/backend/register/register-user';

const selectAutocomplete = (selector, text) => {
  cy.get(selector).clear().type(text);

  cy.get('body').then(($body) => {
    const hasListbox = $body.find('[role="listbox"] [role="option"]').length > 0;
    if (hasListbox) {
      cy.get('[role="listbox"] [role="option"]').first().click();
    } else {
      cy.get(selector).type('{enter}');
    }
  });
};

const setDate = (rootSelector, { d, m, y }) => {
  cy.get(rootSelector).within(() => {
    cy.get('[data-type="day"]').click().type(String(d).padStart(2, '0'));
    cy.get('[data-type="month"]').click().type(String(m).padStart(2, '0'));
    cy.get('[data-type="year"]').click().type(String(y));
  });
};

const fillAllValid = (overrides = {}) => {
      const randomDni = () => String(Math.floor(10000000 + Math.random() * 90000000));
  const data = {
    nombres: 'Facundo',
    apellido: 'Pasqua',
    telefono: '3511234567', // 10 dígitos
    dni: randomDni(),       // 8 dígitos
    provincia: 'Córdoba',
    localidad: 'Córdoba',
    fechaNac: { d: 5, m: 11, y: 1996 },
    email: `facu.qa+${Date.now()}@example.com`,
    confirmarEmail: null, // si es null, usa el mismo que email
    password: 'Qa!12345',
    repetirPassword: null // si es null, usa el mismo que password
  };

  Object.assign(data, overrides);
  if (!data.confirmarEmail) data.confirmarEmail = data.email;
  if (!data.repetirPassword) data.repetirPassword = data.password;

  cy.get('[data-cy="input-nombres"]').clear().type(data.nombres);
  cy.get('[data-cy="input-apellido"]').clear().type(data.apellido);

  cy.get('[data-cy="input-telefono"]').clear().type(data.telefono);
  cy.get('[data-cy="input-dni"]').clear().type(data.dni);

  selectAutocomplete('[data-cy="select-provincia"]', data.provincia);
  selectAutocomplete('[data-cy="select-localidad"]', data.localidad);

  // fechaNac: si es false, la dejamos incompleta (negativo)
  if (data.fechaNac) setDate('[data-cy="input-fecha-nacimiento"]', data.fechaNac);

  cy.get('[data-cy="input-email"]').clear().type(data.email);
  cy.get('[data-cy="input-confirmar-email"]').clear().type(data.confirmarEmail);

  cy.get('[data-cy="input-password"]').clear().type(data.password, { log: false });
  cy.get('[data-cy="input-repetir-password"]').clear().type(data.repetirPassword, { log: false });

  return data;
};

const assertNoRegisterRequest = () => {
  // Damos un respiro a la UI para intentar enviar
  cy.wait(400);
  // En Cypress se puede inspeccionar la cantidad de intercepciones con .all
  cy.get('@register.all').should('have.length', 0);
};

describe('Registro de cuenta', () => {
  beforeEach(() => {
    cy.intercept('POST', REGISTER_API_PATTERN).as('register'); // spy (no stub)
    cy.visit(REGISTER_URL);
  });

  it('registra correctamente y devuelve 200/201', () => {
    fillAllValid();

    // Antes de enviar, no debería haber inputs inválidos
    cy.get('input:invalid').should('have.length', 0);

    cy.get('[data-cy="btn-registrarse"]').click();

    // Asertamos respuesta 200/201 de la request real
    cy.wait('@register').its('response.statusCode').should('be.oneOf', [200, 201]);

    // Opcional: assert de redirección o mensaje de éxito
    // cy.url().should('include', '/auth/login');
    // cy.contains(/registro (exitoso|completado)/i).should('be.visible');
  });

  it('no envía si hay campos requeridos vacíos', () => {
    // Click directo sin completar nada
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('input:invalid').its('length').should('be.greaterThan', 0);
    assertNoRegisterRequest();
  });

  it('no envía con teléfono inválido (<10 dígitos)', () => {
    fillAllValid({ telefono: '351123' }); // inválido por pattern/maxlength
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-telefono"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });

  it('no envía con DNI inválido (<8 dígitos)', () => {
    fillAllValid({ dni: '1234' });
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-dni"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });

  it('no envía con email inválido (type="email")', () => {
    fillAllValid({ email: 'facu@', confirmarEmail: 'facu@' }); // inválido HTML5
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-email"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });

  it('no envía si los emails NO coinciden (si tu UI lo valida)', () => {
    // Si la app no valida en front esta regla, este test fallará: ajustalo según comportamiento real.
    fillAllValid({
      email: `facu.qa+${Date.now()}@example.com`,
      confirmarEmail: 'otro+correo@example.com'
    });

    cy.get('[data-cy="btn-registrarse"]').click();

    // Esperamos que el front evite enviar al backend
    assertNoRegisterRequest();

    // (Opcional) si hay mensaje de error
    // cy.contains(/emails? no coinciden/i).should('be.visible');
  });

  it('no envía si la fecha está incompleta', () => {
    // Pasamos fechaNac = false para dejar "dd/mm/aaaa"
    fillAllValid({ fechaNac: false });

    cy.get('[data-cy="btn-registrarse"]').click();

    // El DateField incluye un input hidden required -> debe invalidar el form
    cy.get('input:invalid').its('length').should('be.greaterThan', 0);
    assertNoRegisterRequest();
  });

  it('permite ir al login desde el link', () => {
    cy.get('[data-cy="btn-login-link"]').click();
    cy.url().should('include', '/auth/login');
  });
});
