import { faker} from '@faker-js/faker/locale/en';


describe('home lojista', () => {
  beforeEach(()=>{
    cy.switchBaseUrl(Cypress.config('baseUrl2'))
  })
 
  it('web deve estar online', () => {
    cy.request({
      url: '/'
  }).then(response =>{
      expect(response.status).to.eq(200)
  })
    cy.visit('/')
    cy.wait(2000)
    cy.title().should('eq', 'PB Club')
  })

  })

  describe('home cliente', ()=>{
    
  
    it('web online', ()=>{
      cy.request({
        url: '/auto-atendimento'
    }).then(response =>{
        expect(response.status).to.eq(200)
    })
      cy.visit('/auto-atendimento')
      cy.wait(2000)
      cy.title().should('eq', 'PB Club')
    })
   
})
    