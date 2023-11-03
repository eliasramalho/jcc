describe('homeLojista', () => {

  it('webOnline', () => {
    cy.request({
      url: '/'
    }).then(response => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/')
    cy.wait(2000)
    cy.title().should('eq', 'Super Cliente')
  })

})

describe('homeCliente', () => {

  it('webOnline', () => {
    cy.request({
      url: '/auto-atendimento'
    }).then(response => {
      expect(response.status).to.eq(200)
    })
    cy.visit('/auto-atendimento')
    cy.wait(2000)
    cy.title().should('eq', 'Super Cliente')
  })

})
