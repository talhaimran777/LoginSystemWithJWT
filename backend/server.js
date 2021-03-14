const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const User = require('./models/User');

// const jwt = require('jsonwebtoken');

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

        // IF THE USER IS NOT PRESENT
        if (user === null) {
          // IF NAME NOT PRESENT MAKE A DEFAULT NAME
          if (!name) {
            name = 'default';
          }
          // PUT THIS USER IN THE DB

          let user = {
            name,
            email,
            password,
          };

          let createdUser = await User.create(user);
          if (createdUser) {
            res.statusCode = 201;
            res.json({
              status: 'Success',
              data: createdUser,
            });
          }

          // User.create(user)
          //   .then((user) => {
          //     res.statusCode = 201;
          //     res.json(user);
          //   })
          //   .catch((err) => {
          //     res.statusCode = 400;

          //     res.json({
          //       status: 'Failed!',
          //       message: 'Bad Request!',
          //     });
          //   });

          // try {
          // } catch (err) {
          //   res.statusCode = 500;

          //   res.json({
          //     status: 'Failed',
          //     message: 'Internal server error!',
          //     data: err,
          //   });
          // }
        } else {
          res.statusCode = 400;
          res.json({
            status: 'Failed',
            message: 'Email already taken!',
          });
        }
      } catch (err) {
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
