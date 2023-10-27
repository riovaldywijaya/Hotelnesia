const errorHandler = (err, req, res, next) => {
  console.log(err, '<<<<<<<<< ini error di handler');
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: err.errors[0].message,
      });
      break;
    case 'NameIsNull':
      res.status(400).json({ message: 'Name is required' });
      break;
    case 'EmailIsNull':
      res.status(400).json({ message: 'Email is required' });
      break;
    case 'PasswordIsNull':
      res.status(400).json({ message: 'Password is required' });
      break;
    case 'PhoneNumberIsNull':
      res.status(400).json({ message: 'Phone number is required' });
      break;
    case 'ProfilePictureIsNull':
      res.status(400).json({ message: 'Profile picture is required' });
      break;
    case 'AddressIsNull':
      res.status(400).json({ message: 'Address is required' });
      break;
    case 'DateOfBirthIsNull':
      res.status(400).json({ message: 'Date of birth is required' });
      break;
    case 'EmailIsDuplicated':
      res.status(400).json({ message: 'Email must be unique' });
      break;
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: err.errors[0].message,
      });
    case 'MidtransError':
      res.status(400).json({ message: err.ApiResponse.error_messages[0] });
      break;
    case 'InvalidEmailOrPassword':
      res.status(401).json({ message: 'Invalid email or password' });
      break;
    case 'JsonWebTokenError':
    case 'Unauthenticated':
      res.status(401).json({ message: 'Invalid Token' });
      break;
    case 'Unauthorized':
      res.status(403).json({ message: 'You are not authorized' });
      break;
    case 'RoomNotFound':
      res.status(404).json({ message: 'Room not found' });
      break;
    case 'CustomerNotFound':
      res.status(404).json({ message: 'Customer not found' });
      break;

    default:
      res.status(500).json({ name: 'Internal Server Error' });
      break;
  }
};

module.exports = errorHandler;
