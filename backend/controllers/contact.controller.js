const ContactModel = require('../models/contact.model')



module.exports = {
    async list(resquest, h){
        const contacts = await ContactModel.find().exec();
        return contacts
    }
}