package fr.guillaume.hipporp.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "horse")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Horse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String breed;
    private String color;
    private String gender;
    private String dateOfBirth;
    private String placeOfBirth;
    private String sireNumber;
    private String isSick;
    private String isInjured;
    private Long weight;
    private Long height;
    private String difficulty;

    @ElementCollection
    private List<String> horseDisciplines;

}
