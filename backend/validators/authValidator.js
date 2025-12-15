const { body } = require('express-validator');

exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/)
    .withMessage('La contraseña debe tener 8-16 caracteres, incluir mayúscula, minúscula y un número')
];
