# Meeting Calendar Application

This project is a ReactJS-based Meeting Calendar application that allows users to schedule, view, and manage meetings efficiently. The app was developed as part of a workshop to build a professional, modular, and scalable solution using React best practices

## Features

- **Interactive Calendar**: View scheduled meetings in a user-friendly calendar interface.
- **Meeting Management**:
  - Add new meetings with required details.
  - Edit or delete existing meetings.
  - Form validation to ensure valid meeting data.
- **Responsive Design**: Fully responsive interface for seamless use on desktop and mobile devices.
- **Light/Dark Theme**: Toggle between light and dark modes for a personalized user experience.
- **Reusable Components**: Modular components like `MeetingCalendar`, `EditMeetingModal`, and `ThemeToggle` for scalability.

## Tech Stack

- **ReactJS**: Frontend framework for building the user interface.
- **React Calendar**: A lightweight calendar library for the interactive calendar.
- **Tailwind CSS**: For styling and responsive design.
- **React Router**: For navigation within the application.

## Project Structure

# 
      src/
     ├── components/ 
     │ ├── EditMeetingModal.tsx │ 
     ├── MeetingCalendar.tsx │ 
     ├── Navbar.tsx │ 
     ├── Footer.tsx │ 
     ├── ThemeToggle.tsx 
     ├── pages/ │ 
     ├── CalendarPage.tsx │ 
     ├── Home.tsx 
     ├── App.tsx 
     └── index.tsx