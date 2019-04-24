package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EntradaMiembros.
 */
@Entity
@Table(name = "entrada_miembros")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entradamiembros")
public class EntradaMiembros implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_entrada")
    private LocalDate fechaEntrada;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @OneToOne
    @JoinColumn(unique = true)
    private Sedes sedes;

    @ManyToOne
    @JsonIgnoreProperties("entradaMiembros")
    private Miembros miembros;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaEntrada() {
        return fechaEntrada;
    }

    public EntradaMiembros fechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
        return this;
    }

    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public EntradaMiembros fechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
        return this;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Sedes getSedes() {
        return sedes;
    }

    public EntradaMiembros sedes(Sedes sedes) {
        this.sedes = sedes;
        return this;
    }

    public void setSedes(Sedes sedes) {
        this.sedes = sedes;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public EntradaMiembros miembros(Miembros miembros) {
        this.miembros = miembros;
        return this;
    }

    public void setMiembros(Miembros miembros) {
        this.miembros = miembros;
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
        EntradaMiembros entradaMiembros = (EntradaMiembros) o;
        if (entradaMiembros.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entradaMiembros.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntradaMiembros{" +
            "id=" + getId() +
            ", fechaEntrada='" + getFechaEntrada() + "'" +
            ", fechaSalida='" + getFechaSalida() + "'" +
            "}";
    }
}
