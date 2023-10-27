if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const Controller = require('./controllers/controller');
const errorHandler = require('./middlewares/errorHandler');
const authentication = require('./middlewares/authentication');
const authorization = require('./middlewares/authorization');
const upload = require('./helpers/multer');

app.use(express.json());
app.use(cors());

app.post('/register', upload.single('profilePicture'), Controller.userRegister);
app.post('/login', Controller.userLogin);
app.get('/rooms', Controller.getAllRooms);
app.get('/rooms/:roomId', Controller.getDetailRoom);

app.use(authentication);

app.get('/customers', authorization, Controller.getDetailCustomer);
app.put('/customers', authorization, upload.single('profilePicture'), Controller.updateDetailCustomer);

app.post('/generate-midtrans-token', Controller.generateMidtransToken);
app.patch('/bookings/:bookingId', Controller.updateStatusPayment);

app.use(errorHandler);

console.clear();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
