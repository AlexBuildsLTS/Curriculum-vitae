// src/components/MeetingCalendar.tsx

import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect } from "react";
import EditMeetingModal from "./EditMeetingModal";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  level: string;
  participants: string[];
  description: string;
}

const MeetingCalendar: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [level, setLevel] = useState<string>("Team");
  const [participants, setParticipants] = useState<string[]>([""]);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null);

  // Load meetings from localStorage on component mount
  useEffect(() => {
    const storedMeetings = localStorage.getItem("meetings");
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  // Save meetings to localStorage whenever meetings state changes
  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const addParticipantField = () => {
    setParticipants([...participants, ""]);
  };

  const removeParticipantField = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  };

  const validateEmails = (emails: string[]): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  const addMeeting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim inputs
    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();
    const trimmedTime = time.trim();
    const trimmedLevel = level.trim();
    const trimmedParticipants = participants.map((email) => email.trim());
    const trimmedDescription = description.trim();

    // Validation
    if (
      !trimmedTitle ||
      !trimmedDate ||
      !trimmedTime ||
      !trimmedLevel ||
      !trimmedDescription
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      trimmedParticipants.length === 0 ||
      trimmedParticipants.some((email) => email === "")
    ) {
      setError("Please provide at least one participant email.");
      return;
    }

    if (!validateEmails(trimmedParticipants)) {
      setError("Please enter valid email addresses.");
      return;
    }

    // Check for duplicate date and time
    if (
      meetings.some(
        (meeting) =>
          meeting.date === trimmedDate && meeting.time === trimmedTime
      )
    ) {
      setError("A meeting is already scheduled at this date and time.");
      return;
    }

    const newMeeting: Meeting = {
      id: Date.now(),
      title: trimmedTitle,
      date: trimmedDate,
      time: trimmedTime,
      level: trimmedLevel,
      participants: trimmedParticipants,
      description: trimmedDescription,
    };

    setMeetings([...meetings, newMeeting]);
    // Reset form fields
    setTitle("");
    setDate("");
    setTime("");
    setLevel("Team");
    setParticipants([""]);
    setDescription("");
    setError("");
  };

  const deleteMeeting = (idToDelete: number) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== idToDelete));
  };

  const openEditModal = (meeting: Meeting) => {
    setCurrentMeeting(meeting);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentMeeting(null);
    setIsEditModalOpen(false);
  };

  const saveEditedMeeting = (updatedMeeting: Meeting) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === updatedMeeting.id ? updatedMeeting : meeting
      )
    );
  };

  return (
    <section id="meeting-calendar" className="py-24">
      <h2 className="section-heading">Meeting Calendar</h2>
      <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-navy-light">
        {/* Add Meeting Form */}
        <form onSubmit={addMeeting} className="flex flex-col gap-4">
          {error && <div className="text-sm text-red-500">{error}</div>}
          {/* Meeting Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="block mb-1 text-slate-lightest">
              Meeting Title<span className="text-red-500">*</span>
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
          {/* Meeting Date */}
          <div className="flex flex-col">
            <label htmlFor="date" className="block mb-1 text-slate-lightest">
              Meeting Date<span className="text-red-500">*</span>
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
          {/* Meeting Time */}
          <div className="flex flex-col">
            <label htmlFor="time" className="block mb-1 text-slate-lightest">
              Meeting Time<span className="text-red-500">*</span>
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required
            />
          </div>
          {/* Choose Level */}
          <div className="flex flex-col">
            <label htmlFor="level" className="block mb-1 text-slate-lightest">
              Choose Level<span className="text-red-500">*</span>
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required>
              <option value="Team">Team</option>
              <option value="Department">Department</option>
              <option value="Company">Company</option>
              {/* Add more levels as needed */}
            </select>
          </div>
          {/* Participants */}
          <div className="flex flex-col">
            <label className="block mb-1 text-slate-lightest">
              Participants<span className="text-red-500">*</span>
            </label>
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="email"
                  value={participant}
                  onChange={(e) =>
                    handleParticipantChange(index, e.target.value)
                  }
                  placeholder="Enter participant email"
                  className="flex-grow p-2 border rounded border-slate focus:outline-none focus:border-green"
                  required
                />
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipantField(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove participant">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addParticipantField}
              className="self-start mt-2 text-green-500 hover:text-green-700">
              Add Participant
            </button>
          </div>
          {/* Description */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block mb-1 text-slate-lightest">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meeting description"
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              rows={4}
              required></textarea>
          </div>
          {/* Submit Button */}
          <button type="submit" className="self-start btn-primary">
            Create Meeting
          </button>
        </form>

        {/* Scheduled Meetings */}
        <h3 className="mt-12 mb-4 text-xl font-semibold text-green">
          Scheduled Meetings
        </h3>
        {meetings.length === 0 ? (
          <p className="text-slate">No meetings scheduled.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg shadow bg-slate-lightest">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Level
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-lightest">
                    Description
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-lightest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {meetings
                  .sort(
                    (a, b) =>
                      new Date(a.date + " " + a.time).getTime() -
                      new Date(b.date + " " + b.time).getTime()
                  )
                  .map((meeting) => (
                    <tr key={meeting.id} className="border-t">
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {meeting.title}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {new Date(meeting.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {meeting.time}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {meeting.level}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {meeting.participants.join(", ")}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-slate">
                        {meeting.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditModal(meeting)}
                          className="mr-2 text-blue-500 hover:text-blue-700"
                          aria-label="Edit Meeting">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.364 6.636l-11.314 11.314a1 1 0 01-1.414 0l-2.828-2.828a1 1 0 010-1.414L14.95 4.222a1 1 0 011.414 0l2.828 2.828a1 1 0 010 1.414z"
                            />
                          </svg>
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteMeeting(meeting.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete Meeting">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Meeting Modal */}
      {currentMeeting && (
        <EditMeetingModal
          meeting={currentMeeting}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={saveEditedMeeting}
        />
      )}
    </section>
  );
};

export default MeetingCalendar;
