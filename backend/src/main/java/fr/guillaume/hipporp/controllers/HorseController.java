package fr.guillaume.hipporp.controllers;

import fr.guillaume.hipporp.models.Horse;
import fr.guillaume.hipporp.services.HorseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/horses")
@RequiredArgsConstructor
@Slf4j
public class HorseController {

    private final HorseService horseService;

    @GetMapping
    public ResponseEntity<List<Horse>> getHorses() {
        return new ResponseEntity<>(this.horseService.getAllHorses(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Horse> postHorse(@RequestBody Horse horseSent, @AuthenticationPrincipal Jwt jwt) {
        try {
            log.info("Creating horse ...");
            return horseSent.getId() == null ?
                    new ResponseEntity<>(this.horseService.updateHorse(horseSent), HttpStatus.CREATED) :
                    new ResponseEntity<>(this.horseService.updateHorse(horseSent), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteHorse(@PathVariable Long id) {

        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try {
            this.horseService.deleteHorse(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
