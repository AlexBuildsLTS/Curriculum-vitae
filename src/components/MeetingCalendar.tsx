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

// Define the backend URL
const BASE_URL = "https://curriculum-vitae-hbcz.onrender.com";

/**
 * Example context or storage for token/role.
 */
function getAuth() {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "user";
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

  // Fetch meetings from backend
  useEffect(() => {
    fetchMeetings();
  }, []);

  async function fetchMeetings(): Promise<void> {
    try {
      const res = await fetch(`${BASE_URL}/api/meetings`);
      if (!res.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data: Meeting[] = await res.json();
      setMeetings(data);
    } catch (err: unknown) {
      const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Fetch Meetings Error:", errorMessage);
      setError("Failed to load meetings");
    }
  }

  const validateEmails = (emails: string[]): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  async function addMeeting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();
    const trimmedTime = time.trim();
    const trimmedLevel = level.trim();
    const trimmedParticipants = participants.map((email) => email.trim());
    const trimmedDescription = description.trim();

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

    const newMeeting = {
      title: trimmedTitle,
      date: trimmedDate,
      time: trimmedTime,
      level: trimmedLevel,
      participants: trimmedParticipants,
      description: trimmedDescription,
    };

    const { token } = getAuth();
    try {
      const res = await fetch(`${BASE_URL}/api/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      setParticipants([""]);
      setDescription("");
    } catch (err: unknown) {
      const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Add Meeting Error:", errorMessage);
      setError(errorMessage);
    }
  }

  async function deleteMeeting(idToDelete: number) {
    const { token, role } = getAuth();
    if (role !== "admin") {
      alert("Only admin can delete. You're not admin!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/meetings/${idToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete meeting");
      }
      setMeetings((prev) => prev.filter((m) => m.id !== idToDelete));
    } catch (err: unknown) {
      const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Delete Meeting Error:", errorMessage);
      setError(errorMessage || "An error occurred while deleting the meeting.");
    }
  }

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
        <div className="max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-white text-black">
          <form onSubmit={addMeeting} className="flex flex-col gap-4">
            {error && <div className="text-sm text-red-500">{error}</div>}
            {/* Meeting fields */}
            <button
                type="submit"
                className="px-4 py-2 font-semibold text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white"
            >
              Create Meeting
            </button>
          </form>
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
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Level</th>
                    <th>Participants</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {meetings.map((meeting) => (
                      <tr key={meeting.id} className="border-b">
                        <td>{meeting.title}</td>
                        <td>{new Date(meeting.date).toLocaleDateString()}</td>
                        <td>{meeting.time}</td>
                        <td>{meeting.level}</td>
                        <td>{meeting.participants.join(", ")}</td>
                        <td>{meeting.description}</td>
                        <td>
                          <button
                              onClick={() => openEditModal(meeting)}
                              className="mr-2 text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                              onClick={() => deleteMeeting(meeting.id)}
                              className="text-red-600 hover:text-red-800"
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
