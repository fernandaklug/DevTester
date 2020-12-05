const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('DELETE /contacts', () => {

    describe('dado que eu tenho um contato indesejado', ()=> {

        const contact = {
            name: 'Joaquim Xavier',
            number: '11999998888',
            description: 'Corretor de Imóveis'
        }

        let server;
        let resp;
        let contactId;

        before(async ()=> {
            server = await init()

            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })

            contactId = resp.result._id
        })

        it('quando eu apago esse contato', async () => {
            resp = await server.inject({
                method: 'delete',
                url: '/contacts/' + contactId
            })
        })

        it('deve retornar 204', () => {
            expect(resp.statusCode).to.equal(204)
        })

    })

})
