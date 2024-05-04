package fr.guillaume.hipporp.controllers;

import fr.guillaume.hipporp.models.Rider;
import fr.guillaume.hipporp.services.RiderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/riders")
@RequiredArgsConstructor
@Slf4j
public class RiderController {

    private final RiderService riderService;

    @GetMapping
    public ResponseEntity<List<Rider>> getRiders() {
        return new ResponseEntity<>(this.riderService.getAllRiders(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Rider> postRider(@RequestBody Rider riderSent) {
        try {
            log.info("Creating rider ...");
            return riderSent.getId() == null ?
                    new ResponseEntity<>(this.riderService.updateRider(riderSent), HttpStatus.CREATED) :
                    new ResponseEntity<>(this.riderService.updateRider(riderSent), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteRider(@PathVariable Long id) {

        if (id == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        try {
            this.riderService.deleteRider(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
