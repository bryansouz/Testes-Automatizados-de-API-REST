/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
let id;


context('Testes Automatizados de API REST ', () => {
    
    beforeEach('login', () => {
        cy.login("bryan@qa.com",'teste')
    });


    describe('Automação GET - POST', () => {
        describe('Exercicio 1', () => {
            
        // Escreva um teste que verifique se um produto pode ser criado com sucesso,
        // e em seguida, faça uma solicitação GET para verificar se o produto 
        // está na lista de produtos retornada.

            it.only('Adicionando produto', () => {
                let aut;
              
              cy.token('bryan@qa.com','teste').then(token => {
                    // Armazena o token em uma propriedade do objeto "window"
                    cy.window().then(win => {
                      win.token = token
                    })}
                )
           
                cy.request({
                    
                    method: 'POST', 
                    url: 'http://localhost:3000/login', 
                    body: {
                    "email": 'bryan@qa.com',
                    "password": 'teste'
                    }
                }).then((response) => {
                    expect(response.body.message).to.equal('Login realizado com sucesso');
                    aut = response.body.authorization

                })    
            })
            it('Listando o produto adicionado', () => {
                
                    cy.request({
                        method: "GET",
                        url: `http://localhost:3000/produtos/${id}`
                    })
            });
        });
        describe('Exercicio 2', ()=>{

            // Crie um teste que verifique se o tempo de resposta de uma 
            // solicitação GET é menor do que um determinado valor.

            it('Verificação do tempo de resposta menor que 500', () => {
                cy.request({
                    method: "GET",
                    url: "http://localhost:3000/produtos",
                }).its('duration')
                .should('be.lessThan', 500)
            });
        });
        describe('Exercicio 3', () =>{
            
            // Escreva um teste que verifique se um produto pode ser editado com sucesso e, 
            // em seguida, faça uma solicitação GET para verificar se as informações 
            // do produto foram atualizadas corretamente.

            it('Editar um produto', () => {
                it('', () => {
                    
                });
            });
            it('Verificar se o produto foi realmente editado', () => {
                cy.request({
                    method: "PUT",
                    url: `http://localhost:3000/produtos/${id}`,
                    body: {
                        "nome": `${faker.commerce.productName()}`,
                        "preco": `${Math.abs(Math.round(Math.random() * 10))}`,
                        "descricao": `${faker.commerce.productDescription()}`,
                        "quantidade": `${Math.abs(Math.round(Math.random() * 10))}`
                    },
                    headers: { authorization: authorization}
                }).then((response) => {
                    expect(response.body.message).to.equal("Cadastro realizado com sucesso")
                })
            });
        })




    });

    describe("Refatoração do código", () =>{
        
        describe("Exercicio 1", ()=>{
            
            it('Gerando token automático', () => {
                cy.login("fulano@qa.com", "teste")
            });
        })
        describe("Exercicio 2", ()=>{
            it('Gerando produtos diferentes com Math.random', () => {
                cy.request({
                    method: "POST",
                    url: `http://localhost:3000/produtos/`,
                    body: {
                        "nome": `${faker.commerce.productName()}`,
                        "preco": `${Math.abs(Math.round(Math.random() * 10))}`,
                        "descricao": `${faker.commerce.productDescription()}`,
                        "quantidade": `${Math.abs(Math.round(Math.random() * 10))}`
                    },
                    headers: { authorization: authorization}
                     
                }).then((response) => {
                    
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                })
            });
        })
        describe("Exercicio 3", ()=>{

            it('Cadastrar produto como comando customizado', () => {
                    
               cy.cadastrar(faker.commerce.productName(),12,faker.commerce.productDescription(),1)
            });
        })
    })

})// end context