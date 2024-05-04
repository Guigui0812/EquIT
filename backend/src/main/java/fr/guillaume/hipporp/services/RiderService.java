package fr.guillaume.hipporp.services;

import fr.guillaume.hipporp.models.Rider;
import fr.guillaume.hipporp.repositories.RiderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RiderService {

    private final RiderRepository riderRepository;

    public List<Rider> getAllRiders() {
        return riderRepository.findAll();
    }

    public Rider getRiderById(Long id) {
        return riderRepository.findById(id).orElse(null);
    }

    public Rider updateRider(Rider rider) {

        Rider existing;

        if (rider.getId() != null) {
            existing = riderRepository.findById(rider.getId()).orElse(null);
            if (existing == null) return null;
        } else {
            existing = new Rider();
        }

        existing.setFirstName(rider.getFirstName());
        existing.setLastName(rider.getLastName());
        existing.setLevel(rider.getLevel());
        existing.setPseudo(rider.getPseudo());

        return riderRepository.save(existing);
    }

    public void deleteRider(Long id) {
        Rider existing = riderRepository.findById(id).orElse(null);
        if (existing == null) return;
        riderRepository.delete(existing);
    }
}
