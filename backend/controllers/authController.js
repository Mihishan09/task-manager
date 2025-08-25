const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

function signToken(userId) {
  const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev_secret_change_me' : undefined);
  if (!secret) {
    const err = new Error('JWT secret not configured');
    err.status = 500;
    throw err;
  }
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
}

function handleValidation(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = errors.array();
    throw err;
  }
}

exports.register = async (req, res, next) => {
  try {
    handleValidation(req);
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });
    let user;
    try {
      user = await User.create({ name, email, password });
    } catch (e) {
      // Handle race-condition duplicate key
      if (e && e.code === 11000) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      throw e;
    }
    const token = signToken(user.id);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    handleValidation(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};


