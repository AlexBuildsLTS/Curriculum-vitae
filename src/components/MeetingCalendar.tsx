/* src/components/MeetingCalendar.tsx */
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

/**
 * Example context or storage for token/role.
 * In a real app, you'd likely get these from a AuthContext or Redux store.
 * For demonstration, we'll assume there's a "getAuth" function that returns
 * { token, role }, or you can store them in localStorage.
 */
function getAuth() {
  const token = localStorage.getItem('token') || '';
  const role = localStorage.getItem('role') || 'user';
  // If you have no real roles, default to 'user'
  return { token, role };
}

const MeetingCalendar: React.FC = () => {
  // State for the meeting fields
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [level, setLevel] = useState<string>("Team");
  const [participants, setParticipants] = useState<string[]>([""]);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  // For editing
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null);

  // 1) On mount, fetch meetings from backend (instead of localStorage)
  useEffect(() => {
    fetchMeetings();
  }, []);

  async function fetchMeetings() {
    try {
      const res = await fetch(`YOUR_BACKEND_URL/api/meetings`);
      if (!res.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await res.json();
      // data should be an array of meetings
      setMeetings(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load meetings");
    }
  }

  // For the participants array
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

  // Quick email validation
  const validateEmails = (emails: string[]): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  // 2) Create a new meeting via POST /api/meetings
  async function addMeeting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Trim
    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();
    const trimmedTime = time.trim();
    const trimmedLevel = level.trim();
    const trimmedParticipants = participants.map((email) => email.trim());
    const trimmedDescription = description.trim();

    // Basic validations
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

    // Build the new meeting
    const newMeeting = {
      title: trimmedTitle,
      date: trimmedDate,
      time: trimmedTime,
      level: trimmedLevel,
      participants: trimmedParticipants,
      description: trimmedDescription,
    };

    // We'll need a token to create a meeting (if your backend requires auth).
    // If your POST /api/meetings doesn't need token, remove the Authorization header.
    const { token } = getAuth();
    try {
      const res = await fetch(`YOUR_BACKEND_URL/api/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newMeeting),
      });
      if (!res.ok) {
        // Possibly 401 if not logged in, 400 if bad data, etc.
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create meeting");
      }
      const created = await res.json();
      // Insert new meeting into state
      setMeetings([...meetings, created]);

      // Reset form
      setTitle("");
      setDate("");
      setTime("");
      setLevel("Team");
      setParticipants([""]);
      setDescription("");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 3) Delete a meeting (admin only)
  async function deleteMeeting(idToDelete: number) {
    // Check if user is admin
    const { token, role } = getAuth();
    if (role !== "admin") {
      alert("Only admin can delete. You're not admin!");
      return;
    }

    try {
      const res = await fetch(`YOUR_BACKEND_URL/api/meetings/${idToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete");
      }
      // On success, remove from local state
      setMeetings((prev) => prev.filter((m) => m.id !== idToDelete));
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  // For editing
  const openEditModal = (meeting: Meeting) => {
    setCurrentMeeting(meeting);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentMeeting(null);
    setIsEditModalOpen(false);
  };
  const saveEditedMeeting = (updatedMeeting: Meeting) => {
    setMeetings((prev) =>
        prev.map((m) => (m.id === updatedMeeting.id ? updatedMeeting : m))
    );
  };

  return (
      <section id="meeting-calendar" className="py-24">
        <h2 className="section-heading">Meeting Calendar</h2>

        {/* Make text black for form and table */}
        <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-white text-black">
          {/* Add Meeting Form */}
          <form onSubmit={addMeeting} className="flex flex-col gap-4">
            {error && <div className="text-sm text-red-500">{error}</div>}

            {/* Meeting Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="block mb-1 font-semibold">
                Meeting Title<span className="text-red-500">*</span>
              </label>
              <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter meeting title"
                  className="p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                  required
              />
            </div>

            {/* Meeting Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="block mb-1 font-semibold">
                Meeting Date<span className="text-red-500">*</span>
              </label>
              <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                  required
              />
            </div>

            {/* Meeting Time */}
            <div className="flex flex-col">
              <label htmlFor="time" className="block mb-1 font-semibold">
                Meeting Time<span className="text-red-500">*</span>
              </label>
              <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                  required
              />
            </div>

            {/* Choose Level */}
            <div className="flex flex-col">
              <label htmlFor="level" className="block mb-1 font-semibold">
                Choose Level<span className="text-red-500">*</span>
              </label>
              <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                  required
              >
                <option value="Team">Team</option>
                <option value="Department">Department</option>
                <option value="Company">Company</option>
              </select>
            </div>

            {/* Participants */}
            <div className="flex flex-col">
              <label className="block mb-1 font-semibold">
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
                        className="flex-grow p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                        required
                    />
                    {participants.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeParticipantField(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Remove participant"
                        >
                          X
                        </button>
                    )}
                  </div>
              ))}
              <button
                  type="button"
                  onClick={addParticipantField}
                  className="self-start mt-2 text-blue-500 hover:text-blue-700"
              >
                Add Participant
              </button>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="block mb-1 font-semibold">
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter meeting description"
                  className="p-2 border rounded border-gray-400 focus:outline-none focus:border-green-500"
                  rows={4}
                  required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="px-4 py-2 font-semibold text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white"
            >
              Create Meeting
            </button>
          </form>

          {/* Scheduled Meetings */}
          <h3 className="mt-12 mb-4 text-xl font-bold text-green-700">
            Scheduled Meetings
          </h3>
          {meetings.length === 0 ? (
              <p className="text-black">No meetings scheduled.</p>
          ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full rounded-lg shadow bg-white text-black">
                  <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Level
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-center uppercase">
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
                          <tr key={meeting.id} className="border-b">
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {meeting.title}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {new Date(meeting.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {meeting.time}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {meeting.level}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {meeting.participants.join(", ")}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              {meeting.description}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                              {/* Edit Button */}
                              <button
                                  onClick={() => openEditModal(meeting)}
                                  className="mr-2 text-blue-600 hover:text-blue-800"
                                  aria-label="Edit Meeting"
                              >
                                Edit
                              </button>

                              {/* Delete Button (admin only) */}
                              <button
                                  onClick={() => deleteMeeting(meeting.id)}
                                  className="text-red-600 hover:text-red-800"
                                  aria-label="Delete Meeting"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>

        {/* Edit Meeting Modal (unchanged) */}
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
