import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import { useToast } from '../components/ToastProvider';
import TaskForm from '../components/TaskForm';

export default function AddTask() {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    setSubmitting(true);
    try {
      await api.post('/tasks', values);
      toast.success('Task created');
      navigate('/');
    } catch (e) {
      toast.error('Failed to create task');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 tracking-tight">Create a new task</h1>
      <TaskForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}


