package se.alex.lexicon.Curriculum_vitae.service;

import se.alex.lexicon.Curriculum_vitae.entity.Meeting;
import se.alex.lexicon.Curriculum_vitae.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meeting with ID " + id + " not found."));
    }

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public Meeting updateMeeting(Long id, Meeting updatedMeeting) {
        Meeting existingMeeting = getMeetingById(id);
        existingMeeting.setTitle(updatedMeeting.getTitle());
        existingMeeting.setDescription(updatedMeeting.getDescription());
        existingMeeting.setDate(updatedMeeting.getDate());
        return meetingRepository.save(existingMeeting);
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}
