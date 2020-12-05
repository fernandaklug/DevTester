describe('Busca', ()=> {

    const contact = {
        name: 'Mike Portnoy',
        number: '21987654321',
        description: 'Aulas de Bateria'
    }

    context(`Dado que eu tenho o seguinte contato ${contact.name}`, ()=> {
        before(() => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/contacts',
                headers: { 'Content-Type': 'application/json' },
                body: contact,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando faço a busca desse contato', () => {
            cy.dash()
            cy.searchContact(contact.number)
            cy.get('#loader', {timeout: 5000}).should('not.visible')
        })

        it('Devo ver somente esse contato no dashboard', ()=> {
            cy.contactItem().should('have.length', 1)
            cy.contactItem().contains(contact.name)
            cy.contactItem().contains(contact.description)
        })
    })

})
