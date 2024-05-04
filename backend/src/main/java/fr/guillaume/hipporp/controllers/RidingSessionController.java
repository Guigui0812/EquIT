package fr.guillaume.hipporp.controllers;

import fr.guillaume.hipporp.models.Horse;
import fr.guillaume.hipporp.models.RidingSession;
import fr.guillaume.hipporp.services.RidingSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/riding-sessions")
@RequiredArgsConstructor
@Slf4j
public class RidingSessionController {

    private final RidingSessionService ridingSessionService;

    @GetMapping
    public ResponseEntity<List<RidingSession>> getRidingSessions() {
        return new ResponseEntity<>(this.ridingSessionService.getAllRidingSessions(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<RidingSession> getRidingSessionById(@PathVariable Long id) {
        return new ResponseEntity<>(this.ridingSessionService.getRidingSessionById(id), HttpStatus.OK);
    }

    @GetMapping("{id}/horses")
    public ResponseEntity<List<Horse>> getAvailableHorsesForRidingSession(@PathVariable Long id) {
        RidingSession ridingSession = this.ridingSessionService.getRidingSessionById(id);
        if (ridingSession == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(this.ridingSessionService.verifyHorseAvailability(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RidingSession> postRidingSession(@RequestBody RidingSession ridingSessionSent) {
        try {
            log.info("Creating riding session ...");
            return ridingSessionSent.getId() == null ?
                    new ResponseEntity<>(this.ridingSessionService.updateRidingSession(ridingSessionSent), HttpStatus.CREATED) :
                    new ResponseEntity<>(this.ridingSessionService.updateRidingSession(ridingSessionSent), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<RidingSession> updateRidingSession(@PathVariable Long id, @RequestBody RidingSession ridingSession) {
        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        ridingSession.setId(id);
        try {
            return new ResponseEntity<>(this.ridingSessionService.updateRidingSession(ridingSession), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRidingSession(@PathVariable Long id) {
        // Check if id is null
        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try {
            this.ridingSessionService.deleteRidingSession(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
