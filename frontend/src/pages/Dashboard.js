import React, { useEffect, useState } from 'react';
import api from '../axios';
import { useToast } from '../components/ToastProvider';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  async function loadTasks() {
    try {
      setLoading(true);
      const { data } = await api.get('/tasks', {
        params: {
          q: query || undefined,
          status: status !== 'all' ? status : undefined,
          priority: priority !== 'all' ? priority : undefined,
          page,
          limit,
          sort,
          order,
        },
      });
      setItems(data.items);
      setTotal(data.total);
    } catch (e) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, [query, status, priority, page, limit, sort, order]);

  async function toggleStatus(task) {
    try {
      const updated = { status: task.status === 'Completed' ? 'Pending' : 'Completed' };
      await api.put(`/tasks/${task._id}`, updated);
      loadTasks();
      toast.success('Task updated');
    } catch (e) {
      toast.error('Failed to update task');
    }
  }

  async function deleteTask(task) {
    try {
      await api.delete(`/tasks/${task._id}`);
      loadTasks();
      toast.success('Task deleted');
    } catch (e) {
      toast.error('Failed to delete task');
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading) return <div className="text-gray-300 text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="gradient-text">
            Your Tasks
          </span>
        </h1>
        <p className="subtitle">Manage and organize your daily tasks</p>
      </div>

      {/* Filters Toolbar */}
      <div className="toolbar">
        <div className="toolbar-grid">
          <input
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select-control"
          >
            <option value="all" className="select-option">All statuses</option>
            <option value="pending" className="select-option">Pending</option>
            <option value="completed" className="select-option">Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="select-control"
          >
            <option value="all" className="select-option">All priorities</option>
            <option value="low" className="select-option">Low</option>
            <option value="medium" className="select-option">Medium</option>
            <option value="high" className="select-option">High</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="tasks-grid">
        {items.map((t) => (
          <TaskCard key={t._id} task={t} onToggle={toggleStatus} onDelete={deleteTask} />
        ))}
        {items.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <div className="empty-title">No tasks found</div>
            <div className="empty-subtitle">Create your first task to get started</div>
          </div>
        )}
      </div>

      {/* Pagination and Controls */}
      <div className="pagination">
        <div className="flex items-center justify-between gap-4">
          <div className="pagination-info">
            Page {page} of {totalPages} • {total} items
          </div>
          
          <div className="pagination-controls">
            <button
              className="btn-nav"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              ← Previous
            </button>
            
            <button
              className="btn-nav"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next →
            </button>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="select-control"
            >
              <option value="createdAt" className="select-option">Created</option>
              <option value="dueDate" className="select-option">Due date</option>
              <option value="priority" className="select-option">Priority</option>
            </select>
            
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="select-control"
            >
              <option value="desc" className="select-option">↓ Desc</option>
              <option value="asc" className="select-option">↑ Asc</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}


