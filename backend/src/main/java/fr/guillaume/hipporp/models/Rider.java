package fr.guillaume.hipporp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "rider")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Rider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pseudo;
    private String firstName;
    private String lastName;
    private String level;

    private Integer licenseNumber;

    @ElementCollection
    private List<String> skillsInterestedIn;

    private boolean bringItsOwnHorse;


}
