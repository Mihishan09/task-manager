const { validationResult } = require('express-validator');
const Task = require('../models/Task');

function handleValidation(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = errors.array();
    throw err;
  }
}

exports.createTask = async (req, res, next) => {
  try {
    handleValidation(req);
    const { title, description, dueDate, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      ownerId: req.user?.id,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    // Enforce validation for query params
    handleValidation(req);
    const { q, status, priority, page = 1, limit = 12, sort = 'createdAt', order = 'desc' } = req.query;
    const filter = { ownerId: req.user?.id };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }
    if (status) {
      const normalized = String(status).toLowerCase() === 'completed' ? 'Completed' : 'Pending';
      filter.status = normalized;
    }
    if (priority) {
      const p = String(priority).toLowerCase();
      filter.priority = p === 'high' ? 'High' : p === 'medium' ? 'Medium' : 'Low';
    }

    const sortField = ['createdAt', 'dueDate', 'priority'].includes(String(sort)) ? String(sort) : 'createdAt';
    const sortOrder = String(order).toLowerCase() === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Task.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(Number(limit)),
      Task.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    // Enforce validation for route params
    handleValidation(req);
    const task = await Task.findOne({ _id: req.params.id, ownerId: req.user?.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    handleValidation(req);
    const { id } = req.params;
    const updates = req.body;
    // Ensure users can only update their own tasks
    const task = await Task.findOneAndUpdate({ _id: id, ownerId: req.user?.id }, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    // Enforce validation for route params
    handleValidation(req);
    const { id } = req.params;
    // Ensure users can only delete their own tasks
    const deleted = await Task.findOneAndDelete({ _id: id, ownerId: req.user?.id });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


