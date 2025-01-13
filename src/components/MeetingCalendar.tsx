import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect } from "react";

// Define the Meeting interface
interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  level: string;
  participants: string[];
  description: string;
}

const BASE_URL = "http://localhost:4000"; // Update this as needed

const MeetingCalendar: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("Team");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  async function fetchMeetings() {
    try {
      const res = await fetch(`${BASE_URL}/api/meetings`);
      if (!res.ok) throw new Error("Failed to fetch meetings");
      const data: Meeting[] = await res.json();
      setMeetings(data);
    } catch (err) {
      console.error("Fetch Meetings Error:", err);
      setError("Failed to load meetings");
    }
  }

  async function addMeeting(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !date.trim() || !time.trim() || !description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email.");
      return;
    }

    const newMeeting = {
      title,
      date,
      time,
      level,
      participants: [email],
      description,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create meeting");
      }

      const created = await res.json();
      setMeetings([...meetings, created]);
      setTitle("");
      setDate("");
      setTime("");
      setLevel("Team");
      setDescription("");
      setEmail("");
    } catch (err) {
      console.error("Add Meeting Error:", err);
      setError("Failed to create meeting");
    }
  }

  return (
      <section id="meeting-calendar" className="py-12 bg-gray-50 text-black">
        <h2 className="text-center text-2xl font-bold text-green-600 mb-6">
          Meeting Calendar
        </h2>

        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
          <form onSubmit={addMeeting} className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Meeting Title"
                className="w-full p-2 border rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 border rounded"
              />
              <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-2 border rounded"
              />
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Meeting Description"
                className="w-full p-2 border rounded"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-2 border rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Meeting
            </button>
          </form>

          <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-700">
            Scheduled Meetings
          </h3>

          {meetings.length === 0 ? (
              <p>No meetings scheduled.</p>
          ) : (
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Description</th>
                </tr>
                </thead>
                <tbody>
                {meetings.map((meeting) => (
                    <tr key={meeting.id} className="hover:bg-gray-50">
                      <td className="border p-2">{meeting.title}</td>
                      <td className="border p-2">
                        {new Date(meeting.date).toLocaleDateString()}
                      </td>
                      <td className="border p-2">{meeting.time}</td>
                      <td className="border p-2">{meeting.description}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </section>
  );
};

export default MeetingCalendar;
