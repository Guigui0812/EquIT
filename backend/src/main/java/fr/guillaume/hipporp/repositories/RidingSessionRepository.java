package fr.guillaume.hipporp.repositories;

import fr.guillaume.hipporp.models.RidingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RidingSessionRepository extends JpaRepository<RidingSession, Long> {
}
