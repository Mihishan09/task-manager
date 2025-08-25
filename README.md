# Task Management System

A full-stack task management system built with React, TypeScript, and Material-UI. This application allows administrators to manage tasks and users, with features like OAuth authentication, PDF report generation, and email verification.

## Features

- **Authentication**
  - Google OAuth 2.0 login
  - Email/password login with Gmail code verification
  - Protected routes and middleware

- **Task Management**
  - Create, read, update, and delete tasks
  - Search and filter tasks
  - Export tasks to PDF
  - Task status tracking
  - Deadline management

- **User Management**
  - View and edit user profiles
  - Admin user management
  - User role management
  - Account deactivation

- **UI/UX**
  - Modern and responsive design
  - Material-UI components
  - Tailwind CSS styling
  - Loading states and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Google OAuth credentials
- Gmail account for email verification

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API services
├── utils/         # Utility functions
├── types/         # TypeScript types
└── App.tsx        # Main application component
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/verify` - Email verification

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Users
- `GET /api/users` - Get all users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update password
- `PUT /api/users/:id` - Update user (admin)
- `PUT /api/users/:id/deactivate` - Deactivate user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- React Router for routing
- Axios for API requests
- jsPDF for PDF generation
- Google OAuth for authentication
