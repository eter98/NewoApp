package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pais.
 */
@Entity
@Table(name = "pais")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "pais")
public class Pais implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_pais")
    private String nombrePais;

    @OneToMany(mappedBy = "pais")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ciudad> ciudads = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePais() {
        return nombrePais;
    }

    public Pais nombrePais(String nombrePais) {
        this.nombrePais = nombrePais;
        return this;
    }

    public void setNombrePais(String nombrePais) {
        this.nombrePais = nombrePais;
    }

    public Set<Ciudad> getCiudads() {
        return ciudads;
    }

    public Pais ciudads(Set<Ciudad> ciudads) {
        this.ciudads = ciudads;
        return this;
    }

    public Pais addCiudad(Ciudad ciudad) {
        this.ciudads.add(ciudad);
        ciudad.setPais(this);
        return this;
    }

    public Pais removeCiudad(Ciudad ciudad) {
        this.ciudads.remove(ciudad);
        ciudad.setPais(null);
        return this;
    }

    public void setCiudads(Set<Ciudad> ciudads) {
        this.ciudads = ciudads;
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
        Pais pais = (Pais) o;
        if (pais.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pais.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pais{" +
            "id=" + getId() +
            ", nombrePais='" + getNombrePais() + "'" +
            "}";
    }
}
