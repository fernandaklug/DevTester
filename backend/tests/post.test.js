const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('POST /contacts', ()=> {

    let resp;

    describe('quando o payload é bonitão', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda 2",
                number: "11999999999",
                description: "Lorem Ispum Test"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
    
        it('deve retornar 200', async ()=> {
            expect(resp.statusCode).to.equal(200)
        })
    
        it('deve retornar o id do contato', async () => {
            expect(resp.result._id).to.be.a.object()
            expect(resp.result._id.toString().length).to.equal(24)
        })
    })

    describe('quando o payload não tem o nome', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                number: "11999999999",
                description: "Lorem Ispum Test"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Name is required.')
        })
    })

    describe('quando o nome está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "",
                number: "11999999999",
                description: "Lorem Ispum Test"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Name is required.')
        })
    })

    describe('quando o payload não tem o whatsapp', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                description: "Lorem Ispum Test"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Number is required.')
        })
    })

    describe('quando o whatsapp está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "",
                description: "Lorem Ispum Test"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Number is required.')
        })
    })

    describe('quando o payload não tem o assunto', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "11999999999"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Description is required.')
        })
    })

    describe('quando o assunto está em branco', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "Fernanda",
                number: "11999999999",
                description: ""
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })

        it('deve retornar 409', async ()=> {
            expect(resp.statusCode).to.equal(409)
        })

        it('deve retornar uma mensagem', async () => {
            expect(resp.result.message).to.equal('Description is required.')
        })
    })

})
