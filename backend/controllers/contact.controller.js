const { create } = require('../models/contact.model');
const ContactModel = require('../models/contact.model')

module.exports = {
    async create(request, h) {

        const contact = new ContactModel({
            name: request.payload.name,
            number: request.payload.number,
            description: request.payload.description
        })

        if (!contact.name)
            return h.response({ message: 'Name is required.' }).code(409)

        if (!contact.number)
            return h.response({ message: 'Number is required.' }).code(409)

        if (!contact.description)
            return h.response({ message: 'Description is required.' }).code(409)

        let result = await contact.save()

        return h.response(result).code(200);
    },
    async list(resquest, h) {
        const contacts = await ContactModel.find().exec();
        return contacts
    }
}