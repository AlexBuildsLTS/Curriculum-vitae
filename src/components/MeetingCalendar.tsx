// src/components/MeetingCalendar.tsx
import 'react-calendar/dist/Calendar.css'; 
import React, { useState, useEffect } from 'react';

interface Meeting {
  title: string;
  date: string;
}

const MeetingCalendar: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Load meetings from localStorage on component mount
  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  // Save meetings to localStorage whenever meetings state changes
  useEffect(() => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim inputs
    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();

    // Validation
    if (!trimmedTitle || !trimmedDate) {
      setError('Please provide both title and date.');
      return;
    }

    if (meetings.some((meeting) => meeting.date === trimmedDate)) {
      setError('A meeting is already scheduled on this date.');
      return;
    }

    const newMeeting: Meeting = {
      title: trimmedTitle,
      date: trimmedDate,
    };

    setMeetings((prevMeetings) => [...prevMeetings, newMeeting]);
    setTitle('');
    setDate('');
    setError('');
  };

  const deleteMeeting = (dateToDelete: string) => {
    setMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.date !== dateToDelete)
    );
  };

  return (
    <section id="meeting-calendar" className="py-24">
      <h2 className="section-heading">Meeting Calendar</h2>
      <div className="max-w-2xl p-6 mx-auto rounded-lg shadow-lg bg-navy-light">
        <form onSubmit={addMeeting} className="flex flex-col gap-4">
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="title" className="block mb-1 text-slate-lightest">
              Meeting Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter meeting title"
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="block mb-1 text-slate-lightest">
              Meeting Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required
            />
          </div>
          <button
            type="submit"
            className="self-start btn-primary"
          >
            Add Meeting
          </button>
        </form>

        <h3 className="mt-8 mb-4 text-xl font-semibold text-green">Scheduled Meetings</h3>
        {meetings.length === 0 ? (
          <p className="text-slate">No meetings scheduled.</p>
        ) : (
          <ul className="space-y-4">
            {meetings
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((meeting) => (
                <li
                  key={meeting.date}
                  className="flex items-center justify-between p-4 rounded-lg shadow bg-slate-lightest"
                >
                  <div>
                    <p className="text-lg font-medium text-slate">{meeting.title}</p>
                    <p className="text-sm text-slate-light">{new Date(meeting.date).toDateString()}</p>
                  </div>
                  <button
                    onClick={() => deleteMeeting(meeting.date)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MeetingCalendar;
