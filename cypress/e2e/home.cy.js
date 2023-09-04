import { faker} from '@faker-js/faker/locale/en';

describe('home lojista', () => {
  beforeEach(()=>{
    cy.switchBaseUrl(Cypress.config('baseUrl'))
  })
  it('web deve estar online', () => {
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

  describe('home cliente', ()=>{
    beforeEach(()=>{
      cy.switchBaseUrl(Cypress.config('baseUrl2'))
    })
  
    it('web online', ()=>{
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
    