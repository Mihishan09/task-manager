import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, onToggle, onDelete }) {
  const priorityBadge =
    task.priority === 'High'
      ? 'bg-red-100 text-red-700 border-red-200'
      : task.priority === 'Medium'
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-emerald-100 text-emerald-700 border-emerald-200';

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white transition hover:shadow-xl hover:-translate-y-0.5">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg leading-tight">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full border ${priorityBadge}`}>{task.priority}</span>
        </div>
        {task.description && (
          <p className="text-sm text-gray-700 line-clamp-3">{task.description}</p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
          <div className={`font-medium ${task.status === 'Completed' ? 'text-emerald-700' : 'text-gray-700'}`}>
            {task.status}
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={() => onToggle(task)} className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">
            Mark {task.status === 'Completed' ? 'Pending' : 'Completed'}
          </button>
          <Link to={`/tasks/${task._id}/edit`} className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">
            Edit
          </Link>
          <button onClick={() => onDelete(task)} className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-600 hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


