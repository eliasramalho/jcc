import faker from 'faker-br';
// ***********************************************

//Comando para logar usuario
Cypress.Commands.add('logarUsuario', ()=>{
    //100500 senha 123456@!
    const codigo = "100500" ;
    const senha = "123456!@";
    cy.visit('/')
    //Localiza e preenche o campo
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
})

//Comando para preenher Campo passando valor
Cypress.Commands.add('preencherCampo', (selector, valor)=>{
    // Localiza o elemento e preenche com o valor desejado
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
// Comando para preencher o campo com email aleatorio
Cypress.Commands.add('randomEmail', (selector)=>{
    // Gera email aleatorio usando o 'faker-br'
    const email = faker.internet.email();
// Localiza o elemento e preenche xom email  gerado
    cy.get(selector).type(email)
   
})
//Comando para preencher o campo com um CPF aleatorio
Cypress.Commands.add('randomCpf', ()=>{
    const randomCpf = faker.br.cpf();
    //Localiza e preenche o campo
    cy.get('#cpf')
    .type(randomCpf).type('{enter}')
   
})
//Comando para preencher CPF ja cadastrado no sistema
Cypress.Commands.add('cpfCadastrado', ()=>{
    const codigo = "100500" ;
    const senha = "123456@!";
    cy.visit('/')
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
    cy.get('#cpf')
    .type('542.983.358-44').type('{enter}')   
})

// Comando para trocar baseUrl
Cypress.Commands.add('switchBaseUrl', (baseUrl) => {
    Cypress.config('baseUrl', baseUrl);
  })

  Cypress.Commands.add('campoCpf', ()=>{
    //Acessar home da aplicacao
    cy.visit('/')
    //Localiza o campo cpf
    cy.get('#cpf')
})

Cypress.Commands.add('cpfAleatorio', ()=>{
    // Gerar o cpf aleatorio usando o 'faker-br'
    const randomCpf = faker.br.cpf();
    //Acessa pagina home da aplicacao
    cy.visit('/')
    //Localiza o elemento 
    cy.get('#cpf')
    //Preenche o campo com um cpf aleatorio e realiza o evento de pressionar o botao enter
    .type(randomCpf).type('{enter}')
})

//Comando para logar usuario PRDO
Cypress.Commands.add('logarUsuarioProd', ()=>{
    //100500 senha 123456@!
    const codigo = "1112" ;
    const senha = "supercliente@2023";
    cy.visit('/')
    //Localiza e preenche o campo
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
})

//Comando para preencher CPF ja cadastrado no sistema PROD
Cypress.Commands.add('cpfCadastradoProd', ()=>{
    //331.768.918-81
    //867.251.368-18
    const codigo = "1112";
    const senha = "supercliente@2023";
    cy.visit('/')
    cy.get('input[id=code]').type(codigo)
    cy.get('input[id=password]').type(senha)
    cy.get('button[name=entrar]').click()
    cy.get('#cpf')
    .type('331.768.918-81').type('{enter}')   
})
  

