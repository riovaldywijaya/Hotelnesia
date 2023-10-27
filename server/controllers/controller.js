const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { Customer, Booking, Room } = require('../models');
const createQR = require('../helpers/qrcode');
const imageKit = require('../helpers/imagekit');
const fs = require('fs/promises');
const midtransClient = require('midtrans-client');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { Op } = require('sequelize');

class Controller {
  static async userRegister(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address, dateOfBirth } = req.body;

      if (!name) throw { name: 'NameIsNull' };
      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };
      if (!phoneNumber) throw { name: 'PhoneNumberIsNull' };
      if (!address) throw { name: 'AddressIsNull' };
      if (!dateOfBirth) throw { name: 'DateOfBirthIsNull' };

      let profilePicture = req.file.originalname;
      if (!profilePicture) throw { name: 'ProfilePictureIsNull' };

      const findCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (findCustomer) throw { name: 'EmailIsDuplicated' };

      const data = await fs.readFile(req.file.path);
      const result = await imageKit.upload({
        file: data,
        fileName: req.file.originalname,
        folder: 'customers_PP',
      });

      const createCustomer = await Customer.create({ name, email, password, phoneNumber, profilePicture: result.url, address, dateOfBirth });

      res.status(201).json(createCustomer);
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };

      const findCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!findCustomer) throw { name: 'InvalidEmailOrPassword' };

      const isValidPassword = comparePassword(password, findCustomer.password);

      if (!isValidPassword) throw { name: 'InvalidEmailOrPassword' };

      const access_token = signToken({
        id: findCustomer.id,
        email: findCustomer.email,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getAllRooms(req, res, next) {
    const { filter, page } = req.query;

    console.log(req.query, '<<<<<<<<');
    let limit = 5;
    let offset = 0;

    let options = {
      include: {
        model: Booking,
        required: false,
        where: {},
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        availability: true,
      },
      order: [['id', 'asc']],
    };

    console.log(filter, '<<<<< ini filter');
    // filtering by date
    if (filter !== '' && typeof filter !== 'undefined') {
      if (filter.checkinDate && filter.checkoutDate) {
        options.include.where.checkoutDate = {
          [Op.notBetween]: [filter.checkinDate, filter.checkoutDate],
        };

        options.include.where.checkinDate = {
          [Op.notBetween]: [filter.checkinDate, filter.checkoutDate],
        };
      }

      if (filter.adult) {
        options.where.adult = {
          [Op.gte]: filter.adult,
        };
      }

      if (filter.children) {
        options.where.children = {
          [Op.gte]: filter.children,
        };
      }
    }

    // pagination
    if (page !== '' && typeof page !== 'undefined') {
      if (page.size !== '' && typeof page.size !== 'undefined') {
        limit = page.size;
        options.limit = limit;
      }

      if (page.number !== '' && typeof page.number !== 'undefined') {
        offset = page.number * limit - limit;
        options.offset = offset;
      }
    } else {
      limit = 5;
      offset = 0;
      options.limit = limit;
      options.offset = offset;
    }

    try {
      const rooms = await Room.findAll(options);
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailRoom(req, res, next) {
    try {
      const { roomId } = req.params;

      const room = await Room.findByPk(roomId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!room) throw { name: 'RoomNotFound' };

      const qr = await createQR(req.params.roomId);

      res.status(200).json({ room, qr });
    } catch (error) {
      next(error);
    }
  }

  static async getDetailCustomer(req, res, next) {
    try {
      const customerDetailId = req.customer.id;

      const customer = await Customer.findByPk(customerDetailId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      });

      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }

  static async updateDetailCustomer(req, res, next) {
    try {
      const customerDetailId = req.params.id;
      const { name, email, password, phoneNumber, address, dateOfBirth } = req.body;

      if (!name) throw { name: 'NameIsNull' };
      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };
      if (!phoneNumber) throw { name: 'PhoneNumberIsNull' };
      if (!address) throw { name: 'AddressIsNull' };
      if (!dateOfBirth) throw { name: 'DateOfBirthIsNull' };

      let profilePicture = req.file.originalname;
      if (!profilePicture) throw { name: 'ProfilePictureIsNull' };

      await Customer.create(
        { name, email, password, phoneNumber, profilePicture, address, dateOfBirth },
        {
          where: {
            id: customerDetailId,
          },
        }
      );

      res.status(200).json({ message: 'Data has been updated' });
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      const { RoomId, checkinDate, checkoutDate, totalPayment } = req.body;
      const statusPayment = 'pending';
      const bookingDate = new Date();
      const CustomerId = req.customer.id;

      const createBooking = await Booking.create({ CustomerId, RoomId, bookingDate, checkinDate, checkoutDate, totalPayment, statusPayment });

      const findCustomer = await Customer.findByPk(CustomerId);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: 'TRANSACTION_' + Math.floor(1000000 * Math.random() + 9000000),
          gross_amount: totalPayment,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: findCustomer.email,
          phone: findCustomer.phoneNumber,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json({ midtransToken, bookingId: createBooking.id });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatusPayment(req, res, next) {
    try {
      const { bookingId } = req.params;

      const customerBook = await Booking.findOne({
        where: {
          id: bookingId,
        },
        include: {
          model: Customer,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      });

      const roomBook = await Booking.findOne({
        where: {
          id: bookingId,
        },
        include: {
          model: Room,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      });

      function formatRupiah(amount) {
        let rupiah = 'Rp ' + amount.toLocaleString('id-ID');
        if (!rupiah.match(',')) {
          rupiah += ',00';
        }
        if (rupiah.split(',')[1].length === 1) {
          rupiah += '0';
        }
        return rupiah;
      }

      const totalPaymentFormatted = formatRupiah(roomBook.totalPayment);

      await Booking.update(
        {
          statusPayment: 'success',
        },
        {
          where: {
            id: bookingId,
          },
        }
      );

      function getFormattedDate() {
        const today = new Date();
        const year = today.getFullYear().toString().slice(-2);
        let month = (today.getMonth() + 1).toString();
        let day = today.getDate().toString();

        if (month.length < 2) {
          month = '0' + month;
        }

        if (day.length < 2) {
          day = '0' + day;
        }

        return `${day}/${month}/${year}`;
      }

      const getBill = async (req, res) => {
        let config = {
          service: 'gmail',
          auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.PASSWORD_GMAIL,
          },
        };

        let transporter = nodemailer.createTransport(config);

        let mailGenerator = new Mailgen({
          theme: 'default',
          product: {
            name: 'Hotelnesia',
            link: 'https://mailgen.js/',
          },
        });

        let response = {
          body: {
            name: customerBook.Customer.name,
            intro: 'Your payment has been sucessfully confirmed. Please see your order details below:',
            table: {
              data: [
                {
                  item: roomBook.Room.name,
                  description: `You have booked a room with a total capacity of ${roomBook.Room.adult + roomBook.Room.children} people. It has several features such as ${roomBook.Room.features} and also have several facilities such as ${
                    roomBook.Room.facilities
                  }`,
                  price: totalPaymentFormatted,
                },
              ],
            },
            outro: 'Looking forward to do more business.',
          },
        };

        let mail = mailGenerator.generate(response);

        let message = {
          from: process.env.USER_GMAIL,
          to: customerBook.Customer.email,
          subject: `[HOTELNESIA] Your payment has success - Booking ID HTNS/${getFormattedDate()}/XXXXXXXXX`,
          html: mail,
        };

        transporter.sendMail(message);
      };
      getBill();

      res.status(200).json({ message: `update status payment with booking id ${bookingId} success` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
