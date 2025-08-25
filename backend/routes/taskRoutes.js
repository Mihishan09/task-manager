const express = require('express');
const { body, param, query } = require('express-validator');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  auth,
  [
    body('title').isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('dueDate').optional().isISO8601(),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
  ],
  createTask
);

router.get(
  '/',
  auth,
  [
    query('q').optional().isString(),
    query('status').optional().isIn(['pending', 'completed', 'Pending', 'Completed']),
    query('priority').optional().isIn(['low', 'medium', 'high', 'Low', 'Medium', 'High']),
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }),
    query('sort').optional().isIn(['createdAt', 'dueDate', 'priority']),
    query('order').optional().isIn(['asc', 'desc'])
  ],
  getTasks
);

router.get('/:id', auth, [param('id').isMongoId()], getTaskById);

router.put(
  '/:id',
  auth,
  [
    param('id').isMongoId(),
    body('title').optional().isString().trim().notEmpty(),
    body('description').optional().isString(),
    body('dueDate').optional().isISO8601(),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('status').optional().isIn(['Pending', 'Completed']),
  ],
  updateTask
);

router.delete('/:id', auth, [param('id').isMongoId()], deleteTask);

module.exports = router;


