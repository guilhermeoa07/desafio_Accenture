const Joi = require('joi');

const userSchema = Joi.object({
    senha: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports = (req, res, next) => {

    const value = userSchema.validate({ email: req.body.email, senha: req.body.senha })

    console.log(value.value.email)

    if(!value.value.email || !value.value.senha){
        res.status(404).send({Message: "Erro no envio do formulario"})
    } else {
        next()
    }
};
