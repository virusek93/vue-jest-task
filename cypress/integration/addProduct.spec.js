describe('Add Product View', () => {
  beforeEach(() => {
    cy.visit('/add')
  })

  it('successfully loads', () => {
    cy.visit('/add')
  })

  it('have two nav link', () => {
    cy.get('#nav a').should('have.length', 2);
  })

  it('render product form', () => {
    cy.get('form')
  })

  it('render category field with options', () => {
    cy.get('form .v-select').click()
    cy.get('.v-menu__content').find('.v-list-item').should('have.length.greaterThan', 0)
  })

  it('show error message on empty form field', () => {
    cy.get('form .v-text-field').click({multiple: true}).should('have.class', 'error--text')
    cy.get('form .v-textarea').click({multiple: true}).should('have.class', 'error--text')
  })

  it('send fill up form', () => {
    const formData = {
      name: "TestName",
      description: "My Description",
      price: '20',
      category: {
        id: 1,
        title: "Women"
      }
    }
    cy.get('form span[label="Name"]').find('input').type(formData.name).should('contain.value', formData.name)
    cy.get('form span[label="Description"]').find('textarea').type(formData.description).should('contain.value', formData.description)
    cy.get('form span[label="Price"]').find('input').type(formData.price).should('contain.value', formData.price)
    cy.clock()
    cy.get('form .v-select').click().then(() => {
      cy.tick(1000)
      cy.get('.v-menu__content').find('.v-list-item').first().click()
      cy.get('.v-main').click()
      cy.tick(500)
      cy.get('button[type="submit"]').click().then(() => {
        cy.get('.v-snack__wrapper').should('be.visible')
        const ls = JSON.parse(localStorage.getItem('user-products') || '[]')
        expect(ls).to.have.length(1)
      })
    })
  })

  it('check if added product is visible on product list', () => {
    const formData = {
      name: "TestName",
      description: "My Description",
      price: '20',
      category: {
        id: 1,
        title: "Women"
      }
    }
    cy.get('form span[label="Name"]').find('input').type(formData.name).should('contain.value', formData.name)
    cy.get('form span[label="Description"]').find('textarea').type(formData.description).should('contain.value', formData.description)
    cy.get('form span[label="Price"]').find('input').type(formData.price).should('contain.value', formData.price)
    cy.clock()
    cy.get('form .v-select').click().then(() => {
      cy.tick(1000)
      cy.get('.v-menu__content').find('.v-list-item').first().click()
      cy.get('.v-main').click()
      cy.tick(500)
      cy.get('button[type="submit"]').click().then(() => {
        cy.get('.v-snack__wrapper').should('be.visible')
        cy.get('#nav a').first().click().then(() => {
          cy.get('.v-data-table__wrapper tbody tr').should('have.length', 1);
        });
      })
    })
  })
})
