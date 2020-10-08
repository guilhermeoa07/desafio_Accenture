const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SchemaUser = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    telefone: [
        {
            numero: {
                type: String,
                required: true,
                select: false
            },
            ddd: {
                type: String,
                required: true,
                select: false
            }
        }
    ],
    createAT: {
        type: Date,
        default: Date.now
    },
    updateAT: {
        type: Date,
        default: Date.now
    }
});

SchemaUser.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', SchemaUser);