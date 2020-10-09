function decodeToken (token) {
    const authHeader = req.headers.authorization;

    const parts = authHeader.split(' ');

    const [ scheme, token ] = parts;

    return token
}