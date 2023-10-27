const { Customer } = require('../models');

const authorization = async (req, res, next) => {
  try {
    const customerLoginId = req.customer.id;

    const customer = await Customer.findByPk(customerLoginId);

    if (!customer) throw { name: 'CustomerNotFound' };

    if (customer.id !== customerLoginId) throw { name: 'Unauthorized' };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
