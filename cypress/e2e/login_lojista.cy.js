/// <reference types= "cypress"/>
import faker from 'faker-br';


describe('login lojista', () => {
    const randomCpf = faker.br.cpf();
    var name = faker.name.firstName();
    var name2 = faker.name.lastName();

    context('login', () => {
        const campoObgt = 'span:contains("Campo obrigatório")'
        beforeEach(() => {
            cy.visit('/')
        })

        it('campos em branco', () => {
            cy.get('button[name=entrar]').click()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatórioCampo obrigatório')

        })

        it('codigo invalido', () => {
            const msgErro = 'div:contains("E-mail e/ou senha estão inválidos. Verifique e tente novamente.")'
            cy.get('input[id=code]').type('02363/*')
            cy.get('input[id=password]').type('teste123')
            cy.get('button[name=entrar]').click()
            cy.get(msgErro).should('be.visible')
            //.should('have.text', 'E-mail e/ou senha estão inválidos. Verifique e tente novamente.')
        })

        it('senha invalida', () => {
            cy.get('input[id=code]').type('teste')
            cy.get('input[id=password]').type('test')
            cy.get('button[name=entrar]').click()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatório')
        })

    })
    context('lojista logado', () => {
        // cod vendedor 230215; 029584321; 521438;
        var codVendedor = '230215';
        var randomEmail = faker.internet.email();

        it('logar', () => {
            const msgDesejada = 'p:contains("Informe seu CPF e garanta benefícios exclusivos")';
            const msgEsperada = 'Informe seu CPF e garanta benefícios exclusivos';
            cy.logarUsuario()
            cy.get(msgDesejada).should('be.visible')
                .should('have.text', msgEsperada)
        })

        it('cadastrar usuario', () => {
            const msgEsperada = 'p:contains("Falta apenas um passo para confirmar o cadastro ;)")'
            const msgDesejada = 'Falta apenas um passo para confirmar o cadastro ;)'
            cy.logarUsuario()
            cy.wait(1000)
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=cellPhone]', '11981337725')
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.contains('button', 'cadastrar').click()
            cy.wait(1000)
            cy.get(msgEsperada).should('be.visible')
                .should('have.text', msgDesejada)
        })

        it('email ja cadastrado', () => {
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=cellPhone]', '11995447769')
            cy.preencherCampo('input[name=email]', 'vanefe9502@kkoup.com')
            //cy.preencherCampo('input[name=sellerCode]', codVendedor)
            cy.contains('button', 'cadastrar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Email já registrado')
        })

        it('cadastro com campos em branco', () => {
            const nome = 'span:contains("O nome completo é obrigatório")';
            const cell = 'span:contains("O celular é obrigatório.")';
            const email = 'span:contains("O e-mail é obrigatório.")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.contains('button', 'cadastrar').click()
            cy.get(nome).should('be.visible')
            .should('have.text', 'O nome completo é obrigatório')
            cy.get(cell).should('have.text', 'O celular é obrigatório.')
            cy.get('#emailInput').should('have.text', '')
            cy.get(email).should('have.text', 'O e-mail é obrigatório.')
        })

        it('telefone invalido', () => {
            const cellInvl = 'span:contains("Número de celular inválido.")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=cellPhone]', '17724')
            cy.contains('button', 'cadastrar').click()
            cy.get(cellInvl).should('have.text', 'Número de celular inválido.')
        })

        it('email invalido', () => {
            const email = 'span:contains("Digite um e-mail válido")'
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', 'email-invalido')
            cy.preencherCampo('input[name=cellPhone]', '11998523654')
            cy.contains('button', 'cadastrar').click()
            cy.get(email).should('be.visible')
                .should('have.text', 'Digite um e-mail válido')
        })


        // it('codigo vendedor invalido', () => {
        //     const codInvl = 'span:contains("Código de operador inválido")';
        //     const nomeOpInvl = 'span:contains("Operador inválido, realize a alteração")';
        //     cy.logarUsuario()
        //     cy.randomCpf()
        //     cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
        //     cy.preencherCampo('input[name=email]', randomEmail)
        //     cy.preencherCampo('input[name=cellPhone]', '11998523654')
        //     cy.preencherCampo('input[name=sellerCode]', '123')
        //     cy.contains('button', 'cadastrar').click()
        //     cy.get(codInvl).should('have.text', 'Código de operador inválido')
        //     cy.get(nomeOpInvl).should('have.text', 'Operador inválido, realize a alteração')
        //     cy.get('.go3958317564').should('be.visible')
        //         .should('have.text', 'Erro ao cadastrar')
        // })


    })
    context('usuario cadastrado', () => {
        var randomEmail = faker.internet.email();
        const modal = 'p:contains("Insira o token enviado por sms e e-mail:")'

        it('cpf ja cadastrado', () => {
            var cpf = 'p:contains("542.983.358-44")'
            cy.cpfCadastrado()
            cy.get(cpf).should('be.visible')
                .should('have.text', '542.983.358-44')
        })

        it('editar nome do usuario', () => {
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=fullName]').clear()
                .type('User ' + ' ' + 'Teste 123')
            cy.contains('button', 'salvar').click()
            cy.get(modal).should('be.visible')
                .should('have.text', 'Insira o token enviado por sms e e-mail:')
        })

        it('editar telefone', () => {
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=cellPhone]').clear().type('11998774455');
            cy.contains('button', 'salvar').click()
            cy.get(modal).should('be.visible')
                .should('have.text', 'Insira o token enviado por sms e e-mail:')
        })
        it('editar email', () => {
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=email]')
                .clear().type(randomEmail)
            cy.contains('button', 'salvar').click()
            cy.get(modal).should('be.visible')
                .should('have.text', 'Insira o token enviado por sms e e-mail:')
        })

    })
    context('usuario do Happy mais', () => {
        const codigo = "100500" ;
            const senha = "123456@!";

        it('editar crianca nao cadastrada', () => {            
            cy.visit('/')
            cy.get('input[id=code]').type(codigo)
            cy.get('input[id=password]').type(senha)
            cy.get('button[name=entrar]').click()
            cy.get('#cpf')
            .type('166.233.450-86').type('{enter}')  
            cy.contains('button', 'visualizar').click()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Você não possui crianças cadastradas.')
        })

        it('Validar limite de cadastro mensal', () => {
            cy.cpfCadastrado()
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
            .should('have.text', 'Limite de cadastro mensal atingido')
        })

        it('validar exclusao de crianca apos 1 ano', () => {
            const codigo = "100500" ;
            const senha = "123456@!";
            cy.visit('/')
            cy.get('input[id=code]').type(codigo)
            cy.get('input[id=password]').type(senha)
            cy.get('button[name=entrar]').click()
            cy.get('#cpf')
            .type('554.482.200-02').type('{enter}')  
            cy.contains('button', 'visualizar').click()
            cy.get('.content-actions > :nth-child(2) > img').click()
            cy.get('.go3958317564').should('be.visible')
            .should('have.text', 'Crianca não pode ser deletada')
            
        })

        it('validar edicao de crianca apos 1 ano', () => {
            const codigo = "100500" ;
            const senha = "123456@!";
            cy.visit('/')
            cy.get('input[id=code]').type(codigo)
            cy.get('input[id=password]').type(senha)
            cy.get('button[name=entrar]').click()
            cy.get('#cpf')
            .type('554.482.200-02').type('{enter}')  
            cy.contains('button', 'visualizar').click()
            cy.get('.content-actions > :nth-child(1) > img').click()
            cy.contains('button', 'salvar').click()
            cy.get('.go3958317564').should('be.visible')
            .should('have.text', 'Crianca não pode ser atualizada')
            
        })

       
    })

})