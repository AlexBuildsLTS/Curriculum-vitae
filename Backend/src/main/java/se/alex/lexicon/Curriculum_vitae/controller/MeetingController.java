package se.alex.lexicon.Curriculum_vitae.controller;

import se.alex.lexicon.Curriculum_vitae.entity.Meeting;
import se.alex.lexicon.Curriculum_vitae.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        return ResponseEntity.ok(meetingService.getAllMeetings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        return ResponseEntity.ok(meetingService.getMeetingById(id));
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        return ResponseEntity.ok(meetingService.createMeeting(meeting));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable Long id, @RequestBody Meeting meeting) {
        return ResponseEntity.ok(meetingService.updateMeeting(id, meeting));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.noContent().build();
    }
}
