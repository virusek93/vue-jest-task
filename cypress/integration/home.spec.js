describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.visit('/')
  })

  it('have one nav link', () => {
    cy.get('#nav a').should('have.length', 1);
  })

  it('renders categories', () => {
    cy.get('.categories-list')
    cy.get('.categories-list').find('.v-list-item').should('have.length', 2);
  })

  it('open category items', () => {
    cy.get('.categories-list').find('.v-list-item').first().click().then(($el) => {
      cy.get($el).find('.v-list-item__content').first().should('be.visible');
    });
  })

  it('move to add product view', () => {
    cy.get('#nav a[href="/add"]').click();
    cy.url().should('include', '/add');
  });
})
