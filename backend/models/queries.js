// queries.js

module.exports = {
  booking: {
    getAll: `
      SELECT b.*, u.name AS user_name, t.name AS tattoo_name
      FROM booking b
      JOIN users u ON b.id_user = u.id_user
      JOIN tattoos t ON b.id_tattoo = t.id_tattoo
    `,
    getById: 'SELECT * FROM booking WHERE id_booking = $1',
    create: `
      INSERT INTO booking (id_user, id_tattoo, date_booking, hour_booking)
      VALUES ($1,$2,$3,$4) RETURNING *
    `,
    update: `
      UPDATE booking SET id_user = $1, id_tattoo = $2, date_booking = $3, hour_booking = $4
      WHERE id_booking = $5 RETURNING *
    `,
    updateDateTime: `
      UPDATE booking 
      SET date_booking = $1, hour_booking = $2
      WHERE id_booking = $3
      RETURNING *
    `,
    delete: 'DELETE FROM booking WHERE id_booking = $1 RETURNING *'
  },

  tattoo: {
    getAll: 'SELECT * FROM tattoos',
    getById: 'SELECT * FROM tattoos WHERE id_tattoo = $1',
    create: 'INSERT INTO tattoos (name, description, image) VALUES ($1,$2,$3) RETURNING *',
    update: 'UPDATE tattoos SET name = $1, description = $2, image = $3 WHERE id_tattoo = $4 RETURNING *',
    delete: 'DELETE FROM tattoos WHERE id_tattoo = $1 RETURNING *'
  },

  user: {
    getAll: 'SELECT * FROM users',
    getById: 'SELECT * FROM users WHERE id_user = $1',
    create: 'INSERT INTO users (name, email, password, role, is_logged) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    update: 'UPDATE users SET name=$1, email=$2, password=$3, role=$4, is_logged=$5 WHERE id_user=$6 RETURNING *',
    delete: 'DELETE FROM users WHERE id_user = $1 RETURNING *'
  }
};
