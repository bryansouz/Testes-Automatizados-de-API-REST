// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


// commands.js

let tokens = []

Cypress.Commands.add('login', (email, password) => {

  cy.request({
    method: 'POST', 
    url: 'http://localhost:3000/login', 
    body: {
      "email": email,
      "password": password
    }
  }).then((response) => {
    expect(response.body.message).to.equal('Login realizado com sucesso');
    if(tokens.length > 0){
      // tokens.splice(0, 1);
      
    }   
    tokens.push(response.body.authorization)
  });
});

  Cypress.Commands.add('cadastrar', (nome, preco,descricao,quantidade) => {
        cy.request({
            method: "POST",
            url: `http://localhost:3000/produtos`,
            body: {
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "quantidade": quantidade
            },
            headers: { authorization: tokens[0] }
            
        }).then((response) => {
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    })
        
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