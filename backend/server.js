const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
// const jwt = require('jsonwebtoken');

// USING A MIDDLEWARE TO PUT BODY IN REQ OBJECT
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post(
  '/signup',

  // RUNNING VALIDATION MIDDLEWARES USING EXPRESS-VALIDATOR
  body('name'),
  body('email').isEmail().withMessage('Invalid password format!'),
  body('password')
    .isLength({ min: 6, max: 10 })
    .withMessage(
      'Password must contain atleast 6 characters and a maximum of 10 characters!'
    ),
  // FINISHED RUNNING VALIDATION MIDDLEWARES

  (req, res) => {
    // GETTING ERRORS
    const { errors } = validationResult(req);
    if (!errors.length) {
      // IF ALL GOOD
      let { name, email, password } = req.body;

      // IF NAME NOT PRESENT MAKE A DEFAULT NAME
      if (!name) {
        name = 'default';
      }

      // PUT THIS USER IN THE DB
      res.statusCode = 200;
      res.json({
        name,
        email,
        password,
      });
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
