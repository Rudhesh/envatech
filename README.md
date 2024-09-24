# Data Visualization Dashboard with MySQL Integration

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [How It Works](#how-it-works)
  - [MySQL Database Integration](#mysql-database-integration)
  - [Graph and DataTable](#graph-and-datatable)
  - [Authentication with Google and Credentials](#authentication-with-google-and-credentials)
- [Running the Application](#running-the-application)
- [License](#license)

## Introduction
This project is a Data Visualization Dashboard built with Next.js. It allows users to:

- Connect to a MySQL database.
- Visualize data in the form of tables and graphs.
- Save and share custom panels.
- Authenticate using Google OAuth or custom credentials.

## Features
- Connect to a custom MySQL database.
- Dynamic data visualization (tables, graphs).
- Custom panel creation and management.
- Google and credentials-based authentication (with NextAuth.js).
- Data filtering with search and time range.
- Responsive and interactive user interface.

## Technologies
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **MySQL**: Relational database for data storage and querying.
- **NextAuth.js**: Authentication system supporting multiple providers.
- **React**: Frontend library for building the UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **MySQL2**: MySQL client for Node.js.
- **Chart.js**: Library for rendering graphs and charts.
- **Redux**: State management library for handling application-wide state.

## Project Structure
```bash
/components
  /common       # Common components (e.g., Loader, Button)
  /panel        # Panel components (e.g., Graph, Sidebar)
  /ui           # UI elements (e.g., Button, Input)
/pages
  /api          # API routes (connect to database, authentication)
  /dashboard    # Dashboard view
  /auth         # Authentication routes (login, signup)
/utils          # Utility functions (e.g., MySQL query, database connection)


git clone https://github.com/your-repo/data-visualization-dashboard.git
cd data-visualization-dashboard


npm install


npm run dev


# Environment Variables

# MySQL connection
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name

# NextAuth Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret

# NextAuth URLs
NEXTAUTH_URL=http://localhost:3000


# Database Setup

CREATE TABLE your_table_name (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT NOT NULL,
    time_stamp DATETIME NOT NULL,
    status VARCHAR(255)
);



# Authentication
- This application uses NextAuth.js for authentication. You can log in using Google OAuth or credentials-based authentication (email/password).

- To configure Google OAuth, create credentials in the Google API Console and add the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the .env.local file.

# How It Works
## MySQL Database Integration
- The DatabaseConnectionForm component allows users to input their database credentials (host, port, user, password) and connect to their own MySQL database. The connection is handled via a serverless API route (/api/connectDatabase) using mysql2/promise.

# Graph and DataTable
- The Graph component (built using Chart.js) visualizes the data fetched from the database.
- The DataTable component displays the data in tabular form.
- Users can filter data by time range and search using custom search queries.
- Authentication with Google and Credentials
- The application integrates NextAuth.js for user authentication:

- Google OAuth: Users can sign in with their Google account.
- Credentials: Users can sign in using an email/password combination.
- Running the Application
- Start the Next.js development server:

bash
Copy code
npm run dev
Navigate to http://localhost:3000.

Log in using Google or credentials. You will be redirected to the dashboard where you can:

Connect to your MySQL database.
Visualize and filter your data in tables and graphs.
Save and share custom panels.

# License

- This project is licensed under the MIT License. See the LICENSE file for details.