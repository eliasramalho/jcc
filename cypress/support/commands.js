import faker from 'faker-br';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logarUsuario', ()=>{
    const codigo = "100500" ;
    const senha = "123456@!";
    cy.visit('/')
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
})

//Comando para preenher Campo passando valor
Cypress.Commands.add('preencherCampo', (selector, valor)=>{
    // Localiza o elemento e preence com o valor desejado
    cy.get(selector).type(valor)
   
})
// Comando para preencher o campo de nome e sobrenome com nomes aleatórios
Cypress.Commands.add('randomName', (selector)=>{
    // Gera nome e sobrenome usando o 'faker-br'
    const name = faker.name.firstName()
    const name2 = faker.name.lastName()
    // Localizar o elemento e preenchê-lo com os nomes gerados
    cy.get(selector).type(name).type(name2)
})
// Comando para preencher o cmapo email com email aleatorio
Cypress.Commands.add('randomEmail', (selector)=>{
    // Gera email aleatorio usando o 'faker-br'
    const email = faker.internet.email();
// Localiza o elemento e preenche xom email  gerado
    cy.get(selector).type(email)
   
})
Cypress.Commands.add('randomCpf', ()=>{
    const randomCpf = faker.br.cpf();
    cy.get('input[placeholder="Informe o CPF do cliente"]')
    .type(randomCpf).type('{enter}')
   
})

Cypress.Commands.add('entrar', ()=>{
    cy.get('button[name=entrar]').click()
})

Cypress.Commands.add('cadastrar', ()=>{
    cy.get('button[name=cadastrar]').click()
})

Cypress.Commands.add('cpfCadastrado', ()=>{
    const codigo = "100500" ;
    const senha = "123456@!";
    cy.visit('/')
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
    cy.get('input[placeholder="Informe o CPF do cliente"]')
    .type('389.359.950-96').type('{enter}')
   
})

Cypress.Commands.add('salvar', ()=>{
    cy.contains('button', 'salvar')
    .click()
})

Cypress.Commands.add('editarCrianca', ()=>{
    cy.get('button[class="sc-fUnMCh kMHkxG undefined purple outline"]').click()
    cy.get('img[src="/static/media/edit.939ac28af762c22c432c7a03ea08bd2a.svg"]').click()
})

// Comando para trocar baseUrl
Cypress.Commands.add('switchBaseUrl', (baseUrl) => {
    Cypress.config('baseUrl', baseUrl);
  })

  Cypress.Commands.add('campoCpf', ()=>{
    //Acessar home da aplicacao
    cy.visit('/')
    //Localiza o campo cpf
    cy.get('input[placeholder="Informe o CPF do cliente"]')

})

Cypress.Commands.add('cpfAleatorio', ()=>{
    // Gerar o cpf aleatorio usando o 'faker-br'
    const randomCpf = faker.br.cpf();
    //Acessa pagina home da aplicacao
    cy.visit('/')
    //Localiza o elemento 
    cy.get('input[placeholder="Informe o CPF do cliente"]')
    //Preenche o campo com um cpf aleatorio e realiza o evento de pressionar o botao enter
    .type(randomCpf).type('{enter}')
})
  

