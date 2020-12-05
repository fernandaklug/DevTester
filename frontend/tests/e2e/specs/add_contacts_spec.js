describe('Cadastro de Contatos', () => {

    describe('Novo Contato', () => {
        let contact = {
            name: 'Fernanda',
            number: '119999999999',
            description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
        }

        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name)
            })
        })

        describe('Quando submeto o cadastro sem o nome', () => {

            let contact = {
                number: '119999999999',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertName().contains('Nome é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o whatsapp', () => {

            let contact = {
                name: 'Fernanda',
                description: 'Solicitar orçamento para Consultoria em QA e DevOps.'
            }
    
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertNumber().contains('WhatsApp é obrigatório.')
            })
        })

        describe('Quando submeto o cadastro sem o assunto', () => {

            let contact = {
                name: 'Fernanda',
                number: '119999999999'
            }

            before(() => {
                cy.dash()
                cy.createContact(contact)
            })

            it('Deve deve mostrar uma notificação', () => {
                cy.alertDesc().contains('Assunto é obrigatório.')
            })
        })



    })

})
