import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../axios';
import { useToast } from '../components/ToastProvider';
import TaskForm from '../components/TaskForm';

export default function EditTask() {
  const toast = useToast();
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data);
      } catch (e) {
        toast.error('Failed to load task');
      }
    }
    load();
  }, [id, toast]);

  async function handleSubmit(values) {
    setSubmitting(true);
    try {
      await api.put(`/tasks/${id}`, values);
      toast.success('Task updated');
      navigate('/');
    } catch (e) {
      toast.error('Failed to update task');
    } finally {
      setSubmitting(false);
    }
  }

  if (!task) return <div className="text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 tracking-tight">Edit task</h1>
      <TaskForm initialValues={task} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}


