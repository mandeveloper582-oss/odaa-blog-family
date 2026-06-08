const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Provide email and password' });

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const match = await bcrypt.compare(password, passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.me = async (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
};
