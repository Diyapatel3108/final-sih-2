# Attendance Management System

This is a comprehensive attendance management system built for the Smart India Hackathon. The application is designed to streamline attendance tracking for educational institutions, providing distinct functionalities for administrators, teachers, and students.

## Project Overview

This project is a web-based application that provides a modern and efficient solution for managing student attendance. It replaces traditional paper-based methods with a digital system that is more accurate, secure, and easier to manage. The system is designed to be used by three main roles:

*   **Administrators:** Have full control over the system, including user management, fee tracking, and reporting.
*   **Teachers:** Can generate QR codes for attendance, monitor attendance in real-time, and manage their own profiles.
*   **Students:** Can view their attendance records, scan QR codes to mark their attendance, and manage their profiles.

## Detailed Project Flow

The following is a granular, step-by-step overview of the user flow for each role:

### Administrator Flow

1.  **Login:** The administrator logs into the system using their secure credentials.
2.  **Dashboard:** Upon login, they are greeted with a dashboard that presents key metrics at a glance, such as total user counts, fee collection summaries, and recent system activities.
3.  **User Management:**
    *   Navigate to the "Manage Users" section from the main menu.
    *   View a comprehensive list of all teachers and students in the system.
    *   Add new users individually via a form or import multiple users at once using a CSV file.
    *   Edit user details or remove users from the system.
4.  **Fee Management:**
    *   Navigate to the "Fees" section.
    *   View a detailed breakdown of fee status for all students, with options to filter by "Paid," "Unpaid," or "Overdue."
5.  **Reporting:**
    *   Navigate to the "Reports" section.
    *   Generate and export detailed attendance reports, which can be filtered by class, student, or date range.

### Teacher Flow

1.  **Login:** The teacher logs in with their credentials.
2.  **Dashboard:** The teacher's dashboard displays a list of their assigned classes for the day.
3.  **QR Code Generation:**
    *   Select a class to begin the attendance process.
    *   Click "Generate QR Code" to create a unique, time-sensitive QR code for the current session.
4.  **Real-Time Monitoring:**
    *   As students scan the QR code, their names appear in a real-time list on the teacher's screen, marked as "Present."
    *   This provides an immediate and live overview of class attendance.
5.  **Profile Management:** The teacher can navigate to their profile to view or update their personal information.

### Student Flow

1.  **Login:** The student logs in with their credentials.
2.  **Dashboard:** The student's dashboard shows a summary of their overall attendance percentage and a list of their recent classes with their attendance status.
3.  **Scan QR Code:**
    *   The student clicks the "Scan QR Code" button, which opens their device's camera.
    *   They scan the QR code displayed by the teacher.
    *   A confirmation message ("Attendance Marked Successfully") appears, and their attendance is recorded.
4.  **View Attendance:** The student can navigate to the "My Attendance" section to view their complete attendance history, filterable by class or date.
5.  **Profile Management:** The student can view and edit their own profile information.

## Wireframes

Below are textual wireframes that illustrate the basic layout and user interface for the key screens of the application.

### 1. Login Page

```
+----------------------------------+
|             [Logo]               |
|      Attendance System           |
|                                  |
|   Email: [__________________]    |
|                                  |
|   Password: [________________]   |
|                                  |
|         [   Login   ]            |
|                                  |
+----------------------------------+
```

### 2. Administrator Dashboard

```
+----------------------------------------------------+
| [Logo] Dashboard | Manage Users | Fees | Reports | Logout |
+----------------------------------------------------+
|                                                    |
|  +---------------+  +---------------+  +----------+  |
|  | Total Users   |  | Total Fees    |  | ...      |  |
|  |      150      |  |   $50,000     |  |          |  |
|  +---------------+  +---------------+  +----------+  |
|                                                    |
|  Recent Activity                                   |
|  +----------------------------------------------+  |
|  | - Student X marked present...                |  |
|  | - Teacher Y added...                         |  |
|  +----------------------------------------------+  |
|                                                    |
+----------------------------------------------------+
```

### 3. Teacher Dashboard

```
+----------------------------------------------------+
| [Logo]   Dashboard | My Profile | Logout            |
+----------------------------------------------------+
|                                                    |
|  My Classes                                        |
|  +----------------------------------------------+  |
|  | - CS 101 - Intro to Comp Sci   [Generate QR]  |  |
|  | - MA 203 - Calculus II         [Generate QR]  |  |
|  +----------------------------------------------+  |
|                                                    |
|  Real-time Attendance (for active session)         |
|  +----------------------------------------------+  |
|  | - John Doe      - Present                    |  |
|  | - Jane Smith    - Present                    |  |
|  +----------------------------------------------+  |
|                                                    |
+----------------------------------------------------+
```

### 4. Student Dashboard

```
+----------------------------------------------------+
| [Logo] Dashboard | My Attendance | Profile | Logout  |
+----------------------------------------------------+
|                                                    |
|  Welcome, [Student Name]!                          |
|                                                    |
|  +-------------------+   +-----------------------+ |
|  | Overall           |   | [   Scan QR Code    ] | |
|  | Attendance: 95%   |   +-----------------------+ |
|  +-------------------+                             |
|                                                    |
|  Recent Classes                                    |
|  +----------------------------------------------+  |
|  | - CS 101      - Present                      |  |
|  | - MA 203      - Absent                       |  |
|  +----------------------------------------------+  |
|                                                    |
+----------------------------------------------------+
```

## Product Requirements Document (PRD)

### 1. Introduction

This document outlines the product requirements for the Attendance Management System. The goal of this project is to create a comprehensive and user-friendly system for managing student attendance in educational institutions.

### 2. User Roles and Permissions

| Role          | Permissions                                                                                                                                                             |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Administrator | Full access to all features, including user management, fee tracking, and reporting.                                                                                    |
| Teacher       | Can generate QR codes for attendance, monitor attendance in real-time, and manage their own profiles.                                                                 |
| Student       | Can view their attendance records, scan QR codes to mark their attendance, and manage their profiles.                                                                  |

### 3. Key Features

*   **User Authentication:** Secure login for all user roles.
*   **Role-Based Dashboards:** Customized dashboards for each user role.
*   **QR Code Attendance:** A simple and efficient way to mark attendance.
*   **Real-Time Monitoring:** Teachers can monitor attendance in real-time.
*   **User Management:** Administrators can add, edit, and delete users.
*   **Fee Management:** Administrators can track student fees.
*   **Reporting:** Administrators can generate reports on attendance and fees.

### 4. Technical Requirements

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **Backend:** Supabase (for authentication, database, and hosting)

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Diyapatel3108/sih.git
    cd sih
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Supabase:**
    *   Create a new Supabase project.
    *   Go to your project settings and get your Supabase URL and anon key.
    *   Create a `.env.local` file in the root of the project and add your Supabase credentials:

    ```
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Default Login Credentials

You can use the following default credentials to log in and test the different roles:

*   **Administrator:**
    *   **Email:** `admin@example.com`
    *   **Password:** `password`

## Project Structure

*   `src/app/`: Contains the main application pages and layouts for different roles.
*   `src/components/`: Contains reusable UI components.
*   `src/lib/`: Contains utility functions and type definitions.
*   `src/hooks/`: Contains custom React hooks.
*   `src/api/`: Contains API route handlers.
# sih-final
