package fr.guillaume.hipporp.services;

import fr.guillaume.hipporp.models.Horse;
import fr.guillaume.hipporp.repositories.HorseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HorseService {

    private final HorseRepository horseRepository;

    public List<Horse> getAllHorses() {
        return horseRepository.findAll();
    }

    public Horse getHorseById(Long id) {
        return horseRepository.findById(id).orElse(null);
    }

    public Horse updateHorse(Horse horse) {

        Horse existing;

        if (horse.getId() != null) {
            existing = horseRepository.findById(horse.getId()).orElse(null);
            if (existing == null) return null;
        } else {
            existing = new Horse();
        }

        existing.setName(horse.getName());
        existing.setBreed(horse.getBreed());
        existing.setGender(horse.getGender());
        existing.setColor(horse.getColor());
        existing.setSireNumber(horse.getSireNumber());
        existing.setDateOfBirth(horse.getDateOfBirth());
        existing.setPlaceOfBirth(horse.getPlaceOfBirth());
        existing.setWeight(horse.getWeight());
        existing.setHeight(horse.getHeight());

        return horseRepository.save(existing);
    }

    public void deleteHorse(Long id) {
        Horse existing = horseRepository.findById(id).orElse(null);
        if (existing == null) return;
        horseRepository.delete(existing);
    }
}