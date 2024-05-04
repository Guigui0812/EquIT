package fr.guillaume.hipporp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "riding_session")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RidingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String duration;
    private Integer lessonCapacity;
    private String lessonLevel;
    private String teacher;

    @OneToMany
    @JoinColumn(name = "horse_id", referencedColumnName = "id")
    private List<Horse> horses;

    @ManyToMany
    @JoinTable(
            name = "session_rider",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "rider_id")
    )
    private List<Rider> riders;

}
