const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateToken } = require('../handlers/generateToken');
const logger = require('../handlers/logger')

function decodeToken(authorization) {
	const authHeader = authorization;

	const parts = authHeader.split(' ');

	const [scheme, token] = parts;

	return token;
}

exports.post = async (req, res) => {
	try {
		const token = generateToken({ id: req.body.email })

		const user = await User.create({ ...req.body, token });

		return res.status(201).send({
			id: user.id,
			Token: token,
			Create: user.createAT,
			data_atualizacao: user.updateAT,
			ultimo_login: user.createAT
		});
	} catch (err) {
		logger('Error', err)
		if (err.code == 11000) {
			res.status(422).send({ Message: "E-mail já existente." })
		} else {
			res.status(400).send({ Erro: err });
		}
	}
};

exports.logginUser = async (req, res) => {
	try {
		const { email, senha } = req.body;
		const token = generateToken({ id: email });
		const user = await User.findOneAndUpdate({ email }, { $set: { token: await bcrypt.hash(token, 10), updateAT: Date.now() } });
		
		logger('Infor', `Gerado novo token para o usuario: ${user.email}`)
		if (!user) return res.status(401).send({ Erro: 'Usuario não encontrado.' });

		if (!await bcrypt.compare(senha, user.senha)) return res.status(401).send({ Message: 'Senha Invalida.' });

		res.status(200).send({
			id: user.id,
			Token: token,
			Create: user.createAT,
			data_atualizacao: user.updateAT,
			ultimo_login: user.updateAT
		})

	} catch (err) {
		logger('Error', err)
		res.status(400).send({ Erro: err });
	}
};
exports.getUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })

		const reqToken = decodeToken(req.headers.authorization)

		if (!await bcrypt.compare(reqToken, user.token)) {
			res.status(401).send({ Message: 'Não Autorizado.' })
		} else {
			return res.status(201).send({
				id: user.id,
				Token: user.token,
				Create: user.createAT,
				data_atualizacao: user.updateAT,
				ultimo_login: user.updateAT
			});
		}
	} catch (err) {
		logger('Error', err)
		res.status(400).send({ Erro: err });
	}
};


