const { body, param } = require('express-validator');

const validRoles = ['admin', 'hr', 'mkt'];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/;

exports.createUserValidator = [
  body('role')
    .notEmpty().withMessage('El rol es obligatorio')
    .custom(role => validRoles.includes(role.toLowerCase()))
    .withMessage(`Rol inválido. Los permitidos son: ${validRoles.join(', ')}`),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .matches(emailRegex).withMessage('Email inválido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .matches(passwordRegex)
    .withMessage('La contraseña debe tener 8-16 caracteres, incluir mayúscula, minúscula y un número')
];

exports.updateUserValidator = [
  param('user_id')
    .isInt().withMessage('ID de usuario inválido'),
  body('role')
    .optional()
    .custom(role => validRoles.includes(role.toLowerCase()))
    .withMessage(`Rol inválido. Los permitidos son: ${validRoles.join(', ')}`),
  body('email')
    .optional()
    .matches(emailRegex).withMessage('Email inválido'),
  body('password')
  .optional()
  .custom((value) => {
    if (value === "") return true; // permite string vacío
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/;
    if (!passwordRegex.test(value)) {
      throw new Error('La contraseña debe tener 8-16 caracteres, incluir mayúscula, minúscula y un número');
    }
    return true;
  })
];
