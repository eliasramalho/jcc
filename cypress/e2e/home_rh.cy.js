import { faker} from '@faker-js/faker/locale/en';

describe('homeLojista', () => {
  beforeEach(()=>{
    cy.switchBaseUrl(Cypress.config('baseUrl'))
  })
  it('webOnline', () => {
    cy.request({
      url: '/'
  }).then(response =>{
      expect(response.status).to.eq(200)
  })
    cy.visit('/')
    cy.wait(2000)
    cy.title().should('eq', 'Super Cliente')
  })

  })

  describe('homeCliente', ()=>{
    beforeEach(()=>{
      cy.switchBaseUrl(Cypress.config('baseUrl2'))
    })
  
    it('webOnline', ()=>{
      cy.request({
        url: '/'
    }).then(response =>{
        expect(response.status).to.eq(200)
    })
      cy.visit(Cypress.config('baseUrl2'));
      cy.visit('/')
      cy.wait(2000)
      cy.title().should('eq', 'Super Cliente')
    })
   
})
    