const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jsonwebtoken'); // <-- importamos la configuración

module.exports = {
  register: async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.getByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Usuario ya existe" });

    const newUser = await User.create({ name, email, password, role: "user", is_logged: false });

    // Devolver un mensaje y solo los datos necesarios
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id_user: newUser.id_user,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error interno", error: err.message });
  }
},

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.getByEmail(email);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Generar token usando la config de JWT
      const token = jwt.sign(
        { id_user: user.id_user, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );
      res.json({token, user: {
        id_user: user.id_user,
        name: user.name,
        email: user.email,
        role: user.role
        }
});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
