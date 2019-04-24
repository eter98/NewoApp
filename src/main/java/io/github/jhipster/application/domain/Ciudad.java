package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Ciudad.
 */
@Entity
@Table(name = "ciudad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "ciudad")
public class Ciudad implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_ciudad")
    private String nombreCiudad;

    @OneToOne(mappedBy = "ciudad")
    @JsonIgnore
    private Sedes sedes;

    @ManyToOne
    @JsonIgnoreProperties("ciudads")
    private Pais pais;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCiudad() {
        return nombreCiudad;
    }

    public Ciudad nombreCiudad(String nombreCiudad) {
        this.nombreCiudad = nombreCiudad;
        return this;
    }

    public void setNombreCiudad(String nombreCiudad) {
        this.nombreCiudad = nombreCiudad;
    }

    public Sedes getSedes() {
        return sedes;
    }

    public Ciudad sedes(Sedes sedes) {
        this.sedes = sedes;
        return this;
    }

    public void setSedes(Sedes sedes) {
        this.sedes = sedes;
    }

    public Pais getPais() {
        return pais;
    }

    public Ciudad pais(Pais pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(Pais pais) {
        this.pais = pais;
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
        Ciudad ciudad = (Ciudad) o;
        if (ciudad.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ciudad.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ciudad{" +
            "id=" + getId() +
            ", nombreCiudad='" + getNombreCiudad() + "'" +
            "}";
    }
}
