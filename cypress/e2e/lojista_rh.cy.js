/// <reference types= "cypress"/>
import faker from 'faker-br';

//editar nome do usuario
//editar telefone
//editar email

describe('loginLojista', () => {
    const randomCpf = faker.br.cpf();
    var name = faker.name.firstName();
    var name2 = faker.name.lastName();

    context('login', () => {
        const campoObgt = 'span:contains("Campo obrigatório")'
        beforeEach(() => {
            cy.visit('/')
        })

        it('camposEmBranco', () => {
            cy.get('button[name=entrar]').click()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatórioCampo obrigatório')

        })

        it('codigoInvalido', () => {

            cy.get('input[id=code]').type('02363/*')
            cy.get('input[id=password]').type('teste123', { log: false })
            cy.get('button[name=entrar]').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Código de loja e/ou senha estão inválidos. Verifique e tente novamente.')
        })

        it('senhaInvalida', () => {
            cy.get('input[id=code]').type('teste')
            cy.get('input[id=password]').type('test')
            cy.get('button[name=entrar]').click()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatório')
        })

    })
    context('lojistaLogado', () => {
        // cod vendedor 230215; 029584321; 521438;
        // cod vendedor Prod 045518
        var codVendedor = '045518';
        var randomEmail = faker.internet.email();

        it('logar', () => {
            cy.logarUsuarioProd()
            cy.get('.title').should('be.visible')
                .should('have.text', 'Informe o CPF e garanta benefícios exclusivos')
        })

        it('cadastrarUsuario', () => {
            const msgEsperada = 'p:contains("Falta apenas um passo para confirmar o cadastro ;)")'
            const msgDesejada = 'Falta apenas um passo para confirmar o cadastro ;)'
            cy.logarUsuarioProd()
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
            cy.logarUsuarioProd()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.get('#sellerCode').type(codVendedor)
            cy.preencherCampo('input[name=cellPhone]', '11995447769')
            cy.preencherCampo('input[name=email]', 'vanefe9502@kkoup.com')
            cy.contains('button', 'cadastrar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Email já registrado')
        })

        it('camposEmBranco', () => {
            const nome = 'span:contains("O nome completo é obrigatório")';
            const cell = 'span:contains("O celular é obrigatório.")';

            cy.logarUsuarioProd()
            cy.randomCpf()
            cy.contains('button', 'cadastrar').click()
            cy.get(nome).should('be.visible')
                .should('have.text', 'O nome completo é obrigatório')
            cy.get(cell).should('have.text', 'O celular é obrigatório.')
            cy.get('#emailInput').should('have.text', '')
        })

        it('telefoneInvalido', () => {
            const cellInvl = 'span:contains("Número de celular inválido.")';
            cy.logarUsuarioProd()
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
            cy.logarUsuarioProd()
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
            cy.logarUsuarioProd()
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

        it('cpfJaCadastrado', () => {
            var cpf = 'p:contains("331.768.918-81")'

            cy.logarUsuarioProd()
            cy.cpfCadastradoProd()
            cy.get(cpf).should('be.visible')
                .should('have.text', '331.768.918-81')
        })

        it('editarNomeDoUsuario', () => {

            cy.logarUsuarioProd()
            cy.cpfCadastradoProd()
            cy.contains('button', 'editar').click()
            cy.get('input[name=fullName]').clear()
                .type(name + ' ' + name2)
            cy.contains('button', 'salvar').click()
            cy.get('.go2072408551').should('be.visible')
                .should('have.text', '❕Dados atualizados com sucesso')
            //name+' '+name2)
        })

        it('editarTelefone', () => {

            cy.logarUsuarioProd()
            cy.cpfCadastradoProd()
            cy.contains('button', 'editar').click()
            cy.get('input[name=cellPhone]').clear().type('11998774455');
            cy.contains('button', 'salvar').click()
            cy.get(':nth-child(2) > .data').should('be.visible')
                .should('have.text', '331.768.918-81')
        })
        it('editarEmail', () => {

            cy.logarUsuarioProd()
            cy.cpfCadastradoProd()
            cy.get('button[name="editar"]').click()
            cy.get('input[name=email]')
                .clear().type(randomEmail)
            cy.contains('button', 'salvar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Dados atualizados com sucesso')
        })

    })
    context('usuarioDoHappyMais', () => {
        // const codigo = "100500" ;
        // const senha = "123456@!";
        const codigo = "1012";
        const senha = "supercliente@2023";

        it('editarCriancaNaoCadastrada', () => {
            cy.logarUsuarioProd()
            cy.get('#cpf')
                .type('360.614.378-89').type('{enter}')
            cy.contains('button', 'visualizar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Você não possui crianças cadastradas.')
        })

        it('validarLimiteDeCadastroMensal', () => {
            cy.logarUsuarioProd()
            cy.cpfCadastradoProd()
            cy.contains('button', 'adicionar pequeno').click()
            cy.get('input[name="apelido"]').type(name)
            cy.get(':nth-child(2) > .sc-cfxfcM > .css-b62m3t-container > .css-9cuovu-control > .css-9w221s').click()
            cy.get('#react-select-2-option-6').click()
            cy.get(':nth-child(3) > .sc-cfxfcM > .css-b62m3t-container > .css-9cuovu-control > .css-9w221s > .css-dxe1gq').click()
            cy.get('#react-select-3-option-2').click()
            cy.get(':nth-child(4) > .sc-cfxfcM > .css-b62m3t-container > .css-9cuovu-control > .css-9w221s').click()
            cy.get('#react-select-4-option-11').click()
            cy.get(':nth-child(5) > .sc-cfxfcM > .css-b62m3t-container > .css-9cuovu-control > .css-9w221s').should('be.visible').click()
            cy.get('#react-select-5-option-5').click()
            cy.contains('button', 'cadastrar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Limite de crianças cadastradas atingido')
        })

        it('validarExclusaoDeCriancaAposUmAno', () => {

            cy.logarUsuarioProd()
            cy.get('#cpf')
                .type('331.768.918-81').type('{enter}')
            cy.contains('button', 'visualizar').click()
            cy.get(':nth-child(3) > .container-right > .content-actions > :nth-child(2) > img').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Crianca não pode ser deletada')

        })

        it('validarEdicaoDeCriancaAposUmAno', () => {
            cy.logarUsuarioProd()
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