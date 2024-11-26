// src/components/EditMeetingModal.tsx

import React, { useState, useEffect } from "react";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  level: string;
  participants: string[];
  description: string;
}

interface EditMeetingModalProps {
  meeting: Meeting;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMeeting: Meeting) => void;
}

const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  meeting,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState<string>(meeting.title);
  const [date, setDate] = useState<string>(meeting.date);
  const [time, setTime] = useState<string>(meeting.time);
  const [level, setLevel] = useState<string>(meeting.level);
  const [participants, setParticipants] = useState<string[]>(
    meeting.participants
  );
  const [description, setDescription] = useState<string>(meeting.description);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setTitle(meeting.title);
      setDate(meeting.date);
      setTime(meeting.time);
      setLevel(meeting.level);
      setParticipants(meeting.participants);
      setDescription(meeting.description);
      setError("");
    }
  }, [isOpen, meeting]);

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

  const handleSave = () => {
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

    const updatedMeeting: Meeting = {
      id: meeting.id,
      title: trimmedTitle,
      date: trimmedDate,
      time: trimmedTime,
      level: trimmedLevel,
      participants: trimmedParticipants,
      description: trimmedDescription,
    };

    onSave(updatedMeeting);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-navy-light">
        <h2 className="mb-4 text-2xl font-semibold text-slate-lightest">
          Edit Meeting
        </h2>
        <form className="flex flex-col gap-4">
          {error && <div className="text-sm text-red-500">{error}</div>}
          {/* Meeting Title */}
          <div className="flex flex-col">
            <label
              htmlFor="edit-title"
              className="block mb-1 text-slate-lightest">
              Meeting Title<span className="text-red-500">*</span>
            </label>
            <input
              id="edit-title"
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
            <label
              htmlFor="edit-date"
              className="block mb-1 text-slate-lightest">
              Meeting Date<span className="text-red-500">*</span>
            </label>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required
            />
          </div>
          {/* Meeting Time */}
          <div className="flex flex-col">
            <label
              htmlFor="edit-time"
              className="block mb-1 text-slate-lightest">
              Meeting Time<span className="text-red-500">*</span>
            </label>
            <input
              id="edit-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              required
            />
          </div>
          {/* Choose Level */}
          <div className="flex flex-col">
            <label
              htmlFor="edit-level"
              className="block mb-1 text-slate-lightest">
              Choose Level<span className="text-red-500">*</span>
            </label>
            <select
              id="edit-level"
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
              htmlFor="edit-description"
              className="block mb-1 text-slate-lightest">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meeting description"
              className="p-2 border rounded border-slate focus:outline-none focus:border-green"
              rows={4}
              required></textarea>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 transition-colors duration-300 border rounded border-slate text-slate hover:bg-slate-lightest">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 transition-colors duration-300 rounded bg-green text-navy-primary hover:bg-green-dark">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeetingModal;
