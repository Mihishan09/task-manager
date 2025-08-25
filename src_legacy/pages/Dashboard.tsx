import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Assignment as TaskIcon,
  CheckCircle as CompletedIcon,
  Schedule as PendingIcon,
  Warning as OverdueIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

interface RecentTask {
  id: string;
  title: string;
  status: string;
  deadline: string;
  assignedTo: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, tasksResponse] = await Promise.all([
          axios.get('/api/tasks/stats'),
          axios.get('/api/tasks/recent'),
        ]);
        setStats(statsResponse.data);
        setRecentTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/tasks/new"
        >
          Create New Task
        </Button>
      </div>

      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <div className="flex items-center">
                <TaskIcon className="text-blue-500 mr-2" />
                <Typography variant="h6">Total Tasks</Typography>
              </div>
              <Typography variant="h4" className="mt-2">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <div className="flex items-center">
                <CompletedIcon className="text-green-500 mr-2" />
                <Typography variant="h6">Completed</Typography>
              </div>
              <Typography variant="h4" className="mt-2">
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <div className="flex items-center">
                <PendingIcon className="text-yellow-500 mr-2" />
                <Typography variant="h6">Pending</Typography>
              </div>
              <Typography variant="h4" className="mt-2">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <div className="flex items-center">
                <OverdueIcon className="text-red-500 mr-2" />
                <Typography variant="h6">Overdue</Typography>
              </div>
              <Typography variant="h4" className="mt-2">
                {stats.overdue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Recent Tasks
          </Typography>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Deadline</th>
                  <th className="px-4 py-2 text-left">Assigned To</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id} className="border-b">
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          task.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{task.assignedTo}</td>
                    <td className="px-4 py-2">
                      <Button
                        component={Link}
                        to={`/tasks/${task.id}/edit`}
                        size="small"
                        variant="outlined"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 