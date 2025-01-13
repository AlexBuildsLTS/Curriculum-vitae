package se.alex.lexicon.Curriculum_vitae.repository;

import se.alex.lexicon.Curriculum_vitae.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}
