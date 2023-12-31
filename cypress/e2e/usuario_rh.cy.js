/// <reference types= "cypress"/>
import faker from 'faker-br';



describe('validarCampos', () => {
    const randomCpf = faker.br.cpf();
    var name = faker.name.firstName();
    var name2 = faker.name.lastName();
    var randomEmail = faker.internet.email();
    var phoneNumber = faker.phone.phoneNumber();

    beforeEach(() => {
        cy.visit('/auto-atendimento')
    })

    context('usuarioLogado', () => {

        it('camposEmBranco', () => {
            const msgNomeObgt = 'span:contains("O nome completo é obrigatório")';
            const msgCelObgt = 'span:contains("O celular é obrigatório.")';
            const msgEmailObgt = 'span:contains("O e-mail é obrigatório.")';
            cy.cpfAleatorio()
            cy.get('button[name=cadastrar]').click()
            cy.get(msgNomeObgt).should('be.visible')
                .should('have.text', 'O nome completo é obrigatório')
            cy.get(msgCelObgt).should('be.visible')
                .should('have.text', 'O celular é obrigatório.')
            cy.get(msgEmailObgt).should('be.visible')
                .should('have.text', 'O e-mail é obrigatório.')
        })

        it('telefoneInvalido', () => {
            const msgCelInv = 'span:contains("Número de celular inválido.")';

            cy.cpfAleatorio()
            cy.preencherCampo('input[name="fullName"]', name + ' ' + name2)
            cy.preencherCampo('input[name="cellPhone"]', '123456')
            cy.preencherCampo('input[name="email"]', randomEmail)
            cy.get('button[name=cadastrar]').click()
            cy.get(msgCelInv).should('be.visible')
                .should('have.text', 'Número de celular inválido.')
        })

        it('emailInvalido', () => {
            const msgEmailInvl = 'span:contains("Digite um e-mail válido")';

            cy.cpfAleatorio()
            cy.preencherCampo('input[name="fullName"]', name + ' ' + name2)
            cy.preencherCampo('input[name="cellPhone"]', '11982445566')
            cy.preencherCampo('input[name="email"]', '12e3.com')
            cy.get('button[name=cadastrar]').click()
            cy.get(msgEmailInvl).should('be.visible')
                .should('have.text', 'Digite um e-mail válido')
        })

        it('dadosValidos', () => {
            const msgEsperada = 'p:contains("Falta apenas um passo para confirmar o cadastro ;)")'
            const msgDesejada = 'Falta apenas um passo para confirmar o cadastro ;)'

            cy.cpfAleatorio()
            cy.wait(1000)
            cy.preencherCampo('input[name="fullName"]', name + ' ' + name2)
            cy.preencherCampo('input[name="cellPhone"]', '11998877665')
            cy.preencherCampo('input[name="email"]', randomEmail)
            cy.get('button[name=cadastrar]').should('be.visible').click()
            cy.get(msgEsperada).should('be.visible')
                .should('have.text', msgDesejada)
        })

        it('emailJaCadastrado', () => {
            cy.cpfAleatorio()
            cy.wait(1000)
            cy.preencherCampo('input[name="fullName"]', name + ' ' + name2)
            cy.preencherCampo('input[name="cellPhone"]', '11998877665')
            cy.preencherCampo('input[name="email"]', 'bocodi7193@wlmycn.com')
            cy.get('button[name=cadastrar]').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Email já registrado')
        })

    })

    context('validarCampoCpf', () => {
        const cpfCadastrado = '554.482.200-02';
        const msgCpfInvalido = 'form span.position-error';
        const randomCpf = faker.br.cpf();

        it('cpfJaCadastrado', () => {
            cy.campoCpf()
                .type(cpfCadastrado).type('{enter}')
            cy.get('.description')
                .should('have.text', 'Para validar seu acesso, insira o token enviado por sms e e-mail:')
            cy.request({
                url: '/'
            }).then(response => {
                expect(response.status).to.eq(200)
            })
        })

        it('cpfInvalido', () => {
            cy.campoCpf()
                .type(123456).type('{enter}')
            cy.get(msgCpfInvalido).should('be.visible')
                .should('have.text', 'CPF invalido');
        })

        it('cpfNaoCadastrado', () => {
            const msgDesejada = 'p:contains("Ainda não temos o seu cadastro, mas você pode fazê-lo agora mesmo.")' +
                ':contains("É grátis, rápido e fácil!")';
            cy.cpfAleatorio()
            cy.wait(1000)
            cy.get(msgDesejada).should('be.visible')
                .should('have.text', 'Ainda não temos o seu cadastro, mas você pode fazê-lo agora mesmo. É grátis, rápido e fácil!')


        })

        it('login', () => {
            const msgDesejada = 'p:contains("Ainda não temos o seu cadastro, mas você pode fazê-lo agora mesmo.")' +
                ':contains("É grátis, rápido e fácil!")';
            cy.cpfAleatorio()
            cy.wait(1000)
            cy.get(msgDesejada).should('be.visible')
                .should('have.text', 'Ainda não temos o seu cadastro, mas você pode fazê-lo agora mesmo. É grátis, rápido e fácil!')
        })


    })

})