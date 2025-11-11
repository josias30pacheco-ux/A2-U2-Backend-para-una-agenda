const db = require('../models/db');

// Obtener todos los contactos
const getContacts = (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener un contacto por ID
const getContact = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM contacts WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
        res.json(results[0]);
    });
};

// Crear un contacto
const addContact = (req, res) => {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

    db.query('INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)', [name, phone, email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Contacto agregado', id: results.insertId });
    });
};

// Actualizar un contacto
const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    db.query(
        'UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?',
        [name, phone, email, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
            res.json({ message: 'Contacto actualizado' });
        }
    );
};

// Eliminar un contacto
const deleteContact = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contacts WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Contacto no encontrado' });
        res.json({ message: 'Contacto eliminado' });
    });
};

module.exports = { getContacts, getContact, addContact, updateContact, deleteContact };
