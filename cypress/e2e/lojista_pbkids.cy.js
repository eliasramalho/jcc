/// <reference types= "cypress"/>
import faker from 'faker-br';


describe('loginLojista', () => {
    const randomCpf = faker.br.cpf();
    var name = faker.name.firstName();
    var name2 = faker.name.lastName();

    beforeEach(() => {
        cy.switchBaseUrl(Cypress.config('baseUrl2'))
        cy.visit('/')
    })


    context('login', () => {


        it('camposEmBranco', () => {
            cy.get('input[id=code]').type('02363/*').clear()
            cy.wait(1000)
            cy.get('button[name=entrar]').click()
            cy.contains('span', 'Campo obrigatório').should('be.visible')
                .should('have.text', 'Campo obrigatório')


        })

        it('codigoInvalido', () => {
            const msgErro = 'div:contains("Código de loja e/ou senha estão inválidos. Verifique e tente novamente.")'
            cy.get('input[id=code]').type('02363/*')
            cy.get('input[id=password]').type('teste123')
            cy.get('button[name=entrar]').click()
            cy.get(msgErro).should('be.visible')
            //.should('have.text', 'E-mail e/ou senha estão inválidos. Verifique e tente novamente.')
        })

        it('senhaInvalida', () => {
            const msgErro = 'div:contains("Erro: Loja não cadastrada!")'
            cy.get('input[id=code]').type('904')
            cy.get('input[id=password]').type('test')
            cy.get('button[name=entrar]').click()
            cy.get(msgErro).should('be.visible')
            //.should('have.text', 'Erro: Loja não cadastrada!')
        })

    })
    context('lojistaLogado', () => {
        // cod vendedor 230215; 029584321; 521438;
        // cod vendedor Prod 045518
        var codVendedor = '045518';
        var randomEmail = faker.internet.email();

        it('logar', () => {
            cy.logarUsuarioProdPB()
            cy.get('.title').should('be.visible')
                .should('have.text', 'Informe o CPF e garanta benefícios exclusivos')
            cy.get('.city > span').should('be.visible')
                .should('have.text', '9006 - ELDORADO')
        })

        it('cadastrarUsuario', () => {
            const msgEsperada = 'p:contains("Falta apenas um passo para confirmar o cadastro ;)")'
            const msgDesejada = 'Falta apenas um passo para confirmar o cadastro ;)'
            cy.logarUsuarioProdPB()
            cy.wait(1000)
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.get('#sellerCode').type(codVendedor)
            cy.preencherCampo('input[name=cellPhone]', '11981337725')
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.contains('button', 'cadastrar').click()
            cy.wait(1000)
            cy.get(msgEsperada).should('be.visible')
                .should('have.text', msgDesejada)
        })

        it('emailJaCadastrado', () => {
            cy.logarUsuarioProdPB()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.get('#sellerCode').type(codVendedor)
            cy.preencherCampo('input[name=cellPhone]', '11995447769')
            cy.preencherCampo('input[name=email]', 'vanefe9502@kkoup.com')
            cy.contains('button', 'cadastrar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Email já registrado')
        })

        it('cadastroComCamposEmranco', () => {
            const nome = 'span:contains("O nome completo é obrigatório")';
            const cell = 'span:contains("O celular é obrigatório.")';

            cy.logarUsuarioProdPB()
            cy.randomCpf()
            cy.contains('button', 'cadastrar').click()
            cy.get(nome).should('be.visible')
                .should('have.text', 'O nome completo é obrigatório')
            cy.get(cell).should('have.text', 'O celular é obrigatório.')
            cy.get('#emailInput').should('have.text', '')
        })

        it('telefoneInvalido', () => {
            const cellInvl = 'span:contains("Número de celular inválido.")';
            cy.logarUsuarioProdPB()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.get('#sellerCode').type(codVendedor)
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=cellPhone]', '17724')
            cy.contains('button', 'cadastrar').click()
            cy.get(cellInvl).should('have.text', 'Número de celular inválido.')
        })

        it('emailInvalido', () => {
            const email = 'span:contains("Digite um e-mail válido")'
            cy.logarUsuarioProdPB()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.get('#sellerCode').type(codVendedor)
            cy.preencherCampo('input[name=email]', 'email-invalido')
            cy.preencherCampo('input[name=cellPhone]', '11998523654')
            cy.contains('button', 'cadastrar').click()
            cy.get(email).should('be.visible')
                .should('have.text', 'Digite um e-mail válido')
        })


        it('codigoVendedorInvalido', () => {
            const codInvl = 'span:contains("Código de operador inválido")';
            const nomeOpInvl = 'span:contains("Operador inválido, realize a alteração")';
            cy.logarUsuarioProdPB()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=cellPhone]', '11998523654')
            cy.preencherCampo('input[name=sellerCode]', '123')
            cy.contains('button', 'cadastrar').click()
            cy.get(codInvl).should('have.text', 'Código de operador inválido')
            cy.get(nomeOpInvl).should('have.text', 'Operador inválido, realize a alteração')

        })


    })
    context('usuarioCadastrado', () => {
        var randomEmail = faker.internet.email();
        const modal = 'p:contains("Insira o token enviado por sms e e-mail:")'
        const sucesso = 'div:contains("Dados atualizados com sucesso")'

        it('cpfJaCadastrado', () => {
            var nome = 'p:contains("CARLA SANTOS")'
            var tel = 'p:contains("(11) 99853-3573")'
            var email = 'p:contains("hopaco9125@bnovel.com")'
            var cpf = 'p:contains("213.378.080-75")'

            cy.logarUsuarioProdPB()
            cy.get('#cpf').type('213.378.080-75').type('{enter}')
            cy.get(nome).should('have.text', 'CARLA SANTOS')
            cy.get(tel).should('have.text', '(11) 99853-3573')
            cy.get(email).should('have.text', 'hopaco9125@bnovel.com')
            cy.get(cpf).should('have.text', '213.378.080-75')

        })

        it('editarNomeDoUsuario', () => {
            cy.logarUsuarioProdPB()
            cy.get('#cpf').type('612.952.060-30').type('{enter}')
            cy.get('input[name=fullName]').clear()
                .type(name + ' ' + name2)
            cy.contains('button', 'salvar').click()
            cy.get(sucesso).should('be.visible')
            cy.get(':nth-child(1) > .data').should('be.visible')
        })

        it('editarTelefone', () => {
            var tel = 'p:contains("(11) 99877-4855")'

            cy.logarUsuarioProdPB()
            cy.get('#cpf').type('612.952.060-30').type('{enter}')
            cy.get('input[name=cellPhone]').clear().type('11998774855');
            cy.contains('button', 'salvar').click()
            cy.get(sucesso).should('be.visible')
            cy.get(tel).should('have.text', '(11) 99877-4855')
        })
        it('editarEmail', () => {
            var email = 'p:contains(' + randomEmail + ')'

            cy.logarUsuarioProdPB()
            cy.get('#cpf').type('612.952.060-30').type('{enter}')
            cy.get('input[name=email]')
                .clear().type(randomEmail)
            cy.contains('button', 'salvar').click()
            cy.get(sucesso).should('be.visible')
            cy.get(email).should('be.visible')
                .should('have.text', randomEmail)
        })

    })
    context('usuarioDoHappyMais', () => {
        // const codigo = "100500" ;
        // const senha = "123456@!";
        const codigo = "1012";
        const senha = "supercliente@2023";

        it('editarCriancaNao Cadastrada', () => {
            cy.logarUsuarioProdPB()
            cy.get('#cpf')
                .type('252.065.600-06').type('{enter}')
            cy.contains('button', 'visualizar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Você não possui crianças cadastradas.')
        })

        it('ValidarLimiteDeCadastroMensal', () => {
            cy.logarUsuarioProdPB()
            cy.get('#cpf').type('331.768.918-81').type('{enter}')
            cy.contains('button', 'adicionar pequeno').click()
            cy.get('input[name="apelido"]').type(name)
            cy.get(':nth-child(2) > .sc-hCPjZK > .css-b62m3t-container > .css-m5n23o-control').click()
            cy.get('#react-select-2-option-6').click()
            cy.get(':nth-child(3) > .sc-hCPjZK > .css-b62m3t-container > .css-m5n23o-control').click()
            cy.get('#react-select-3-option-2').click()
            cy.get(':nth-child(4) > .sc-hCPjZK > .css-b62m3t-container > .css-m5n23o-control').click()
            cy.get('#react-select-4-option-11').click()
            cy.get(':nth-child(5) > .sc-hCPjZK > .css-b62m3t-container > .css-m5n23o-control').should('be.visible').click()
            cy.get('#react-select-5-option-5').click()
            cy.contains('button', 'cadastrar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Limite de cadastro mensal atingido')
        })

        it('validarExclusaoDeCriancaAposUmAno', () => {

            cy.logarUsuarioProdPB()
            cy.get('#cpf')
                .type('331.768.918-81').type('{enter}')
            cy.contains('button', 'visualizar').click()
            cy.get(':nth-child(3) > .container-right > .content-actions > :nth-child(2) > img').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Crianca não pode ser deletada')

        })

        it('validarEdicaoDeCriancaAposUmAno', () => {
            cy.logarUsuarioProdPB()
            cy.get('#cpf')
                .type('331.768.918-81').type('{enter}')
            cy.contains('button', 'visualizar').click()
            cy.get(':nth-child(3) > .container-right > .content-actions > :nth-child(1) > img').click()
            cy.contains('button', 'salvar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Crianca não pode ser atualizada')

        })


    })

})