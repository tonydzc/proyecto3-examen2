package com.adiazc.jhipsterapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Team.
 */
@Entity
@Table(name = "team")
public class Team implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("teams")
    private Project project;

    @OneToMany(mappedBy = "team")
    private Set<Spring> springs = new HashSet<>();
    @OneToMany(mappedBy = "team")
    private Set<Student> students = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Team name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public Team status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public Team project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<Spring> getSprings() {
        return springs;
    }

    public Team springs(Set<Spring> springs) {
        this.springs = springs;
        return this;
    }

    public Team addSpring(Spring spring) {
        this.springs.add(spring);
        spring.setTeam(this);
        return this;
    }

    public Team removeSpring(Spring spring) {
        this.springs.remove(spring);
        spring.setTeam(null);
        return this;
    }

    public void setSprings(Set<Spring> springs) {
        this.springs = springs;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Team students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Team addStudent(Student student) {
        this.students.add(student);
        student.setTeam(this);
        return this;
    }

    public Team removeStudent(Student student) {
        this.students.remove(student);
        student.setTeam(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Team team = (Team) o;
        if (team.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), team.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Team{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
