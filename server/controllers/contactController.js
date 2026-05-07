const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContactForm,
};
