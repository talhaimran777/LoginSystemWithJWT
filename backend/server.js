const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// USING A MIDDLEWARE TO PUT BODY IN REQ OBJECT
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

let insertUser = async () => {};

app.post(
  '/signup',

  // RUNNING VALIDATION MIDDLEWARES USING EXPRESS-VALIDATOR
  body('name'),
  body('email').isEmail().withMessage('Invalid email format!'),
  body('password')
    .isLength({ min: 6, max: 10 })
    .withMessage(
      'Password must contain atleast 6 characters and a maximum of 10 characters!'
    ),
  // FINISHED RUNNING VALIDATION MIDDLEWARES

  async (req, res) => {
    // GETTING ERRORS
    const { errors } = validationResult(req);
    if (!errors.length) {
      // IF ALL GOOD
      let { name, email, password } = req.body;

      // CHECKING IF THE EMAIL ALREADY EXISTS
      try {
        let user = await User.findOne({ email });

        // IF EMAIL IS NOT TAKEN
        if (user === null) {
          // IF NAME NOT PRESENT MAKE A DEFAULT NAME
          if (!name) {
            name = 'default';
          }

          // HASH THE PASSWORD
          let salt = bcrypt.genSaltSync(10);
          let hashedPassword = bcrypt.hashSync(password, salt);

          // PUT THIS USER IN THE DB
          let user = {
            name,
            email,
            password: hashedPassword,
          };

          // CREATE A NEW USER DOCUMENT IN THE DB
          let createdUser = await User.create(user);

          // ON SUCCESS
          if (createdUser) {
            const { PRIVATE_KEY } = process.env;
            console.log(PRIVATE_KEY);
            // GENERATE A TOKEN & SENT IT AS A JSON
            jwt.sign(
              { user: createdUser },
              PRIVATE_KEY,
              { expiresIn: '1hr' },
              function (err, token) {
                if (token) {
                  res.statusCode = 201;
                  return res.json(token);
                }
              }
            );
          }
        } else {
          // ON FAILURE
          res.statusCode = 400;
          res.json({
            status: 'Failed',
            message: 'Email already taken!',
          });
        }
      } catch (err) {
        // CATCHING INTERNAL SERVER ERROR
        res.statusCode = 500;
        res.json({
          status: 'Failed',
          message: 'Internal server error!',
          data: err,
        });
      }
    } else {
      // IF ERRORS
      res.statusCode = 400;
      res.json({
        status: 'Failed',
        data: errors,
      });
    }
  }
);

module.exports = app;
