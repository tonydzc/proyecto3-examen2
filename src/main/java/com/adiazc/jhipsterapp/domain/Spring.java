package com.adiazc.jhipsterapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Spring.
 */
@Entity
@Table(name = "spring")
public class Spring implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "star_date")
    private Instant starDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("springs")
    private Team team;

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

    public Spring name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getStarDate() {
        return starDate;
    }

    public Spring starDate(Instant starDate) {
        this.starDate = starDate;
        return this;
    }

    public void setStarDate(Instant starDate) {
        this.starDate = starDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Spring endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public Spring status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Team getTeam() {
        return team;
    }

    public Spring team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
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
        Spring spring = (Spring) o;
        if (spring.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), spring.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Spring{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", starDate='" + getStarDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
