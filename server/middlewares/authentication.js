const { verifyToken } = require('../helpers/jwt');
const { Customer } = require('../models');

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: 'Unauthenticated' };

    let payload = verifyToken(access_token);

    let customer = await Customer.findByPk(payload.id);

    if (!customer) throw { name: 'Unauthenticated' };

    req.customer = {
      id: customer.id,
      email: customer.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
