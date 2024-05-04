package fr.guillaume.hipporp.services;

import fr.guillaume.hipporp.models.Horse;
import fr.guillaume.hipporp.models.Rider;
import fr.guillaume.hipporp.models.RidingSession;
import fr.guillaume.hipporp.repositories.RidingSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RidingSessionService {

    private final RidingSessionRepository ridingSessionRepository;
    private final HorseService horseService;

    public List<RidingSession> getAllRidingSessions() {
        return ridingSessionRepository.findAll();
    }

    public RidingSession getRidingSessionById(Long id) {
        return ridingSessionRepository.findById(id).orElse(null);
    }

    public RidingSession updateRidingSession(RidingSession ridingSession) {

        RidingSession existing;


        if (ridingSession.getId() != null) {
            existing = ridingSessionRepository.findById(ridingSession.getId()).orElse(null);
            if (existing == null) return null;
        } else {
            existing = new RidingSession();
        }

        existing.setRiders(ridingSession.getRiders());
        existing.setHorses(ridingSession.getHorses());
        existing.setDate(ridingSession.getDate());
        existing.setDuration(ridingSession.getDuration());
        existing.setTeacher(ridingSession.getTeacher());
        existing.setLessonLevel(ridingSession.getLessonLevel());
        existing.setLessonCapacity(ridingSession.getLessonCapacity());

        return ridingSessionRepository.save(existing);
    }

    public List<Horse> verifyHorseAvailability(Long id) {
        List<Horse> horses = horseService.getAllHorses();

        RidingSession ridingSession = ridingSessionRepository.findById(id).orElse(null);
        List<RidingSession> ridingSessions = ridingSessionRepository.findAll();

        if (ridingSession == null) return null;

        horses.removeIf(h -> ridingSession.getHorses().contains(h));

        for (RidingSession rs : ridingSessions) {
            if (rs.getDate().equals(ridingSession.getDate())) {
                horses.removeAll(rs.getHorses());
            }
        }

        horses.removeIf(h -> Boolean.parseBoolean(h.getIsInjured()));
        horses.removeIf(h -> Boolean.parseBoolean(h.getIsSick()));

        return horses;
    }

    public void deleteRidingSession(Long id) {
        RidingSession existing = ridingSessionRepository.findById(id).orElse(null);
        if (existing == null) return;
        ridingSessionRepository.delete(existing);
    }
}
