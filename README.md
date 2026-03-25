# Academic Campus Event & Registration Portal

A modern, full-stack dynamic web application for managing campus events and student registrations. Built with Node.js, Express, MySQL, and vanilla HTML/CSS/JS frontend using a stunning glassmorphic UI design.

## Features Built
- **Glassmorphic UI**: Beautiful gradients, glass effects, floating background orbs.
- **Student Portal**: Register, login, and dashboard to manage event registrations.
- **Admin Module**: Create, edit, delete events, and manage users/registrations.
- **RESTful API**: Node.js & Express endpoints with JWT authentication.
- **MySQL Database**: Clean schema structure with cascading relations.

## Prerequisites
- Node.js (v18+)
- MySQL Server (e.g., via XAMPP)

## Setup Instructions

### 1. Database Configuration
1. Start your local MySQL server (e.g., start MySQL in XAMPP Control Panel).
2. Open your SQL client and run the schema provided in `database/setup.sql`. This will:
   - Create schema `campus_events_db`.
   - Create `Users`, `Events`, and `Registrations` tables.
   - Insert sample events and a default admin user.

**Default Admin Setup:**
- **Email**: `admin@campus.edu`
- **Password**: `admin123`

### 2. Backend Setup
1. Open a terminal and navigate to the `backend/` directory.
2. Ensure you have installed dependencies:
   ```bash
   npm install
   ```
3. Run the backend Express server:
   ```bash
   npm start
   ```
4. The API will now listen on `http://localhost:3000`.

### 3. Frontend Setup
The frontend is completely static and utilizes client-side JS to communicate with the API. 
1. Open the `frontend/` directory.
2. Open `index.html` in your web browser. A quick live server extension might help if you run into CORS issues with local file protocols, though standard API fetches are configured to allow CORS requests.

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript (ES6 fetch API)
- Backend: Node.js, Express, JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`)
- Database: MySQL (`mysql2` promise wrapper)

## License
MIT
