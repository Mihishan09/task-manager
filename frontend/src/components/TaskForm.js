import React, { useState, useEffect } from 'react';

export default function TaskForm({ initialValues, onSubmit, submitting }) {
  const [values, setValues] = useState({
    title: '', description: '', dueDate: '', priority: 'Low'
  });
  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title || '',
        description: initialValues.description || '',
        dueDate: initialValues.dueDate ? initialValues.dueDate.substring(0, 10) : '',
        priority: initialValues.priority || 'Low',
      });
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      priority: values.priority,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card grid gap-4">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
          <input
            name="title"
            value={values.title}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g. Prepare quarterly report"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className="input-field"
            rows={4}
            placeholder="Briefly describe the task"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
            <select
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="select-control"
            >
              <option className="select-option">Low</option>
              <option className="select-option">Medium</option>
              <option className="select-option">High</option>
            </select>
          </div>
        </div>
        <div className="pt-2">
          <button className="btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Task'}
          </button>
        </div>
      </div>
    </form>
  );
}


