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
            cy.entrar()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatórioCampo obrigatório')

        })

        it('codigo invalido', () => {
            const msgErro = 'div:contains("E-mail e/ou senha estão inválidos. Verifique e tente novamente.")'
            cy.get('input[id=code]').type('02363/*')
            cy.get('input[id=password]').type('teste123')
            cy.entrar()
            cy.get(msgErro).should('be.visible')
            //.should('have.text', 'E-mail e/ou senha estão inválidos. Verifique e tente novamente.')

        })
        it('senha invalida', () => {
            cy.get('input[id=code]').type('teste')
            cy.get('input[id=password]').type('test')
            cy.entrar()
            cy.get(campoObgt).should('be.visible')
                .should('have.text', 'Campo obrigatório')

        })

    })
    context('lojista logado', () => {
        // cod vendedor 230215; 029584321; 521438;
        var codVendedor = '230215';
        var randomEmail = faker.internet.email();

        it('logar', () => {
            const msgDesejada = 'p:contains("O Programa de Fidelidade da Ri Happy que dá vantagens exclusivas e dinheiro de volta.")';
            const msgEsperada = 'O Programa de Fidelidade da Ri Happy que dá vantagens exclusivas e dinheiro de volta.';
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
            cy.preencherCampo('input[name=cellPhone]', '11981447725')
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=sellerCode]', codVendedor)
            cy.cadastrar()
            cy.get(msgEsperada).should('be.visible')
                .should('have.text', msgDesejada)


        })
        it.only('email ja cadastrado', () => {
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=cellPhone]', '11981447724')
            cy.preencherCampo('input[name=email]', 'vanefe9502@kkoup.com')
            cy.preencherCampo('input[name=sellerCode]', codVendedor)
            cy.cadastrar()
            cy.get('.go3958317564').should('be.visible')
                .should('have.text', 'Email já registrado')

        })

        it('cadastro com campos em branco', () => {
            const nomeObgt = 'span:contains("O nome completo é obrigatório")';
            const cellObgt = 'span:contains("O celular é obrigatório.")';
            const emailObgt = 'span:contains("O e-mail é obrigatório.")';
            const vendObgt = 'span:contains("O código do vendedor é obrigatório")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.cadastrar()
            cy.get(nomeObgt).should('be.visible')
                .should('have.text', 'O nome completo é obrigatório')
            cy.get(cellObgt).should('have.text', 'O celular é obrigatório.')
            cy.get(emailObgt).should('have.text', 'O e-mail é obrigatório.')
            cy.get(vendObgt).should('have.text', 'O código do vendedor é obrigatório')


        })
        it('telefone invalido', () => {
            const cellInvl = 'span:contains("Número de celular inválido.")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=cellPhone]', '17724')
            cy.preencherCampo('input[name=sellerCode]', codVendedor)
            cy.cadastrar()
            cy.get(cellInvl).should('have.text', 'Número de celular inválido.')

        })

        it('email invalido', () => {
            const mailInvl = 'span:contains("Digite um e-mail válido")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', 'email-invalido')
            cy.preencherCampo('input[name=cellPhone]', '11998523654')
            cy.preencherCampo('input[name=sellerCode]', codVendedor)
            cy.cadastrar()
            cy.get(mailInvl).should('have.text', 'Digite um e-mail válido')

        })

        it('codigo vendedor invalido', () => {
            const codInvl = 'span:contains("Código de operador inválido")';
            const nomeOpInvl = 'span:contains("Operador inválido, realize a alteração")';
            cy.logarUsuario()
            cy.randomCpf()
            cy.preencherCampo('input[name=fullName]', name + ' ' + name2)
            cy.preencherCampo('input[name=email]', randomEmail)
            cy.preencherCampo('input[name=cellPhone]', '11998523654')
            cy.preencherCampo('input[name=sellerCode]', '123')
            cy.cadastrar()
            cy.get(codInvl).should('have.text', 'Código de operador inválido')
            cy.get(nomeOpInvl).should('have.text', 'Operador inválido, realize a alteração')

        })


    })
    context('usuario cadastrado', () => {
        var randomEmail = faker.internet.email();

        it('cpf ja cadastrado', () => {
            var cpf = 'p:contains("389.359.950-96")'
            cy.cpfCadastrado()
            cy.get(cpf).should('be.visible')
                .should('have.text', '389.359.950-96')

        })

        it('editar nome do usuario', () => {
            const dadosSalvos = 'div:contains("Dados atualizados com sucesso")'
            const novoNome = 'span:contains("User  Teste 123")'
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=fullName]').clear()
                .type('User ' + ' ' + 'Teste 123');
            cy.salvar()
            cy.get(dadosSalvos).should('be.visible')
            cy.get(novoNome).should('have.text', 'User  Teste 123')


        })

        it('editar telefone', () => {
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=cellPhone]').clear()
                .type('11998774455')
            cy.salvar()
            cy.contains('p', '(11) 99877-4455').should('be.visible')
                .should('have.text', '(11) 99877-4455')


        })
        it('editar email', () => {
            cy.cpfCadastrado()
            cy.contains('button', 'editar').click()
            cy.get('input[name=email]')
                .clear().type(randomEmail)
            cy.salvar()
            cy.contains('p', randomEmail)
                .should('be.visible').should('have.text', randomEmail)

        })

    })
    context('usuario do Happy mais', () => {
        it('adicionar crianca', () => {
            const addSucesso = 'div:contains("Pequeno adicionado com sucesso.")';
            cy.cpfCadastrado()
            cy.contains('button', 'adicionar pequeno').click()
            cy.get('input[name="apelido"]').type(name)
            cy.get('input[name="grau_parentesco"]').type(name2)
            cy.get('input[id="react-select-2-input"]').click()
            cy.get('#react-select-2-option-0').click()
            cy.get('#react-select-3-input').click()
            cy.get('#react-select-3-option-5').click()
            cy.get('#react-select-4-input').click()
            cy.get('#react-select-4-option-3').should('be.visible').click()
            cy.contains('button', 'cadastrar').click()
            cy.get(addSucesso).should('be.visible')

        })

        it('editar apelido crianca', () => {
            cy.cpfCadastrado()
            cy.editarCrianca()
            cy.get('#apelido')
                .clear().type(name)
            cy.salvar()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno alterado com sucesso.')

        })

        it('editar grau parentesco', () => {
            cy.cpfCadastrado()
            cy.editarCrianca()
            cy.get('#grau_parentesco')
                .clear().type(name2)
            cy.salvar()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno alterado com sucesso.')

        })

        it('editar genero', () => {
            cy.cpfCadastrado()
            cy.editarCrianca()
            cy.get('input[id="react-select-2-input"]').click()
            cy.get('#react-select-2-option-0').click()
            cy.salvar()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno alterado com sucesso.')
        })

        it('editar mes aniversario', () => {
            cy.cpfCadastrado()
            cy.editarCrianca()
            cy.get('#react-select-3-input').click()
            cy.get('#react-select-3-option-10').click()
            cy.salvar()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno alterado com sucesso.')
        })

        it('editar ano aniversario', () => {
            cy.cpfCadastrado()
            cy.editarCrianca()
            cy.get('#react-select-4-input').click()
            cy.get('#react-select-4-option-5').should('be.visible').click()
            cy.salvar()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno alterado com sucesso.')
        })

        it('excluir crianca', () => {
            cy.cpfCadastrado()
            cy.get('button[class="sc-fUnMCh kMHkxG undefined purple outline"]').click()
            cy.get('img[src="/static/media/trash.c84bc34513a97f5f52ce0748d11d9dfb.svg"]').click()
            cy.get('.go3958317564')
                .should('have.text', 'Pequeno foi excluído com sucesso')

        })

       

    })

})
