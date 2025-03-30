# `Meeting Calendar Applcation´

- This project is a ReactJS-based Meeting Calendar Application designed to:
- Display a calendar where users can view scheduled meetings.
- Allow users to manage meetings (add, edit, delete).
- Provide a responsive and user-friendly interface with theme toggling.
- The application follows a modular approach, with each component handling a specific functionality, ensuring reusability, scalability, and maintainability.

## Features

- [x] Responsive Design: Fully responsive interface for seamless use on desktop and mobile devices.
- [x] Light/Dark Theme: Toggle between light and dark modes for a personalized user experience.
- [x] Interactive Calendar: View scheduled meetings in a user-friendly calendar interface.
- [x] Meeting Management:
- [x] Add new meetings with required details.
- [x] Edit or delete existing meetings.
- [x] Form validation ensures valid meeting data.
- [x] Reusable Components: Modular components like MeetingCalendar, EditMeetingModal, and ThemeToggle for scalability and clean code.
- [x] Tech Stack
- [x] ReactJS: Frontend framework for building the user interface.
- [x] React Calendar: A lightweight library for the interactive calendar.
- [x] Tailwind CSS For styling and responsive design
- [x] React-Router-dom For navigation within the application
- [x] Tech Stack
- [x] ReactJS: Frontend framework for building the user interface.
- [x] React Calendar: A lightweight library for the interactive calendar.
- [x] Tailwind CSS: For styling and responsive design.
- [x] React Router: For navigation within the application.

### ProjectStructure

```bash
src/
├── components/
│   ├── EditMeetingModal.tsx      # Modal for editing meetings
│   ├── MeetingCalendar.tsx       # Calendar component with meeting functionality
│   ├── Navbar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer for branding
│   ├── ThemeToggle.tsx           # Light/Dark mode toggle
├── pages/
│   ├── CalendarPage.tsx          # Main calendar page
│   ├── Home.tsx                  # Home page with introductory content
├── App.tsx                       # Root component for app routing
└── index.tsx                     # Entry point of the application

```**Components and Their Roles**

- Pages
- <CalendarPage.tsx:> Entry point for the calendar feature. Imports and renders the

- MeetingCalendar component.
- <Home.tsx:> Introductory page that showcases personalized content and links.

- Core Components
- <MeetingCalendar.tsx:>
- Renders the calendar grid using react-calendar.
- Manages meeting states and integrates with the modal for editing.
- Highlights active days with scheduled meetings.
- Opens the modal for editing when a meeting is selected.

- <EditMeetingModal.tsx:>
- Modal interface for adding or editing meeting details.
- Handles form inputs and validates data (e.g., title, date, time).
- Updates the state in <MeetingCalendar:> after saving changes.
- Reusable UI Components
- <ThemeToggle.tsx:>
- Provides <light/dark theme toggling:>
- Dynamically applies the .dark class to the root element based on user preference.

- <Navbar.tsx:>
- Contains navigation links and integrates <ThemeToggle:>
- Fully responsive for desktop and mobile.
- <Footer.tsx:>
- Displays branding information, such as the creator's name and copyright.
- Shared Layout
- <Layout.tsx:>
- Wraps all pages to provide a consistent layout.
- Includes <Navbar:>, <Footer:>, and a container for page content.
- CSS and Styling
- The project uses a combination of:

- <Tailwind.CSS:>

- Utility-first framework for building responsive designs.
- Styles are defined in <global.css:> and <index.css:>
- Custom Styles:

- <react-calendar.css:> overrides the default styles of the react-calendar library to match the application theme.
- Dynamic Features
- Meeting Data:

- Meetings are dynamically rendered on the calendar grid from the meetings state.
- Edited meetings update the state, triggering a re-render.
- Form Validation:

- Ensures only valid meetings are saved using manual or library-based validation.
- Theme Toggling:

- Light and dark themes dynamically adjust the entire UI based on user preferences.
- Responsive Design:

- All components adapt seamlessly to different screen sizes using Tailwind CSS.

- #### **How Components Work Together**

``` calendar
CalendarPage.tsx: Parent for the calendar feature.
MeetingCalendar.tsx: Manages the calendar grid and meeting interactions.
EditMeetingModal.tsx: Handles meeting editing, integrated with the calendar's state.
ThemeToggle.tsx: Ensures consistent theming across the app.
Navbar and Footer: Provide navigation and branding for the app.
How to Run the Project
Clone the Repository:
```

git clone <repository-url:>
cd <repository-folder:>
Install Dependencies:

``` npm

npm install

```

- Start the Development Server:

``` npm

npm start
```

- Access the Application: Open <http://localhost:3000> in your browser.

- Conclusion
- This project demonstrates:

````Module
Modularizing components for reusability and scalability.
Dynamically rendering data to enhance interactivity
Combining static layouts with dynamic content for a professional and user-friendly UI.
It serves as an excellent example of leveraging modern tools like React, Tailwind CSS, and react-calendar to
create an interactive, dynamic web application```

````

- Future Goals

### Integrate Backend Support

- [ ] Use a backend service (e.g., Node.js, Express, or Django) for storing and managing meeting data persistently.
- [ ] Implement RESTful APIs to fetch, create, update, and delete meeting records.
- [ ] User Authentication:
- [ ]
- [ ] Add user login and registration functionality to make meetings user-specific.
- [ ] Use JWT or OAuth for secure authentication and authorization.
- [ ] Notifications and Reminders:
- [ ]
- [ ] Implement email or push notifications to remind users of upcoming meetings.
- [ ] Allow users to customize reminder intervals.
- [ ] Advanced Meeting Features:
- [ ]
- [ ] Support recurring meetings with customizable frequency (e.g., daily, weekly, monthly).
- [ ] Add the ability to attach documents or links to a meeting.
- [ ] Improved Search and Filter Options:
- [ ]
- [ ] Enable users to search for meetings by title, participants, or date range.
- [ ] Add filters for meeting levels, dates, and time.
- [ ] Multilingual Support:
- [ ]
- [ ] Provide options for users to view the application in multiple languages.
- [ ] Use a library like react-i18next for implementing translations.
- [ ] Mobile Application:
- [ ]
- [ ] Build a mobile version of the application using React Native for better accessibility on smartphones.
- [ ] Customizable Themes:
- [ ]
- [ ] Extend the theme toggling functionality to support multiple themes (e.g., high contrast, corporate styles).
- [ ]
