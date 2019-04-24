package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Landing.
 */
@Entity
@Table(name = "landing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "landing")
public class Landing implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "telefono_negocio")
    private String telefonoNegocio;

    @Column(name = "numero_puestos")
    private Integer numeroPuestos;

    @Column(name = "numero_oficinas")
    private Integer numeroOficinas;

    @OneToMany(mappedBy = "landing")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TarifaLanding> tarifaLandings = new HashSet<>();
    @OneToOne(mappedBy = "landing")
    @JsonIgnore
    private Sedes sedes;

    @ManyToOne
    @JsonIgnoreProperties("landings")
    private EquipoEmpresas equipoEmpresas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Landing descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTelefonoNegocio() {
        return telefonoNegocio;
    }

    public Landing telefonoNegocio(String telefonoNegocio) {
        this.telefonoNegocio = telefonoNegocio;
        return this;
    }

    public void setTelefonoNegocio(String telefonoNegocio) {
        this.telefonoNegocio = telefonoNegocio;
    }

    public Integer getNumeroPuestos() {
        return numeroPuestos;
    }

    public Landing numeroPuestos(Integer numeroPuestos) {
        this.numeroPuestos = numeroPuestos;
        return this;
    }

    public void setNumeroPuestos(Integer numeroPuestos) {
        this.numeroPuestos = numeroPuestos;
    }

    public Integer getNumeroOficinas() {
        return numeroOficinas;
    }

    public Landing numeroOficinas(Integer numeroOficinas) {
        this.numeroOficinas = numeroOficinas;
        return this;
    }

    public void setNumeroOficinas(Integer numeroOficinas) {
        this.numeroOficinas = numeroOficinas;
    }

    public Set<TarifaLanding> getTarifaLandings() {
        return tarifaLandings;
    }

    public Landing tarifaLandings(Set<TarifaLanding> tarifaLandings) {
        this.tarifaLandings = tarifaLandings;
        return this;
    }

    public Landing addTarifaLanding(TarifaLanding tarifaLanding) {
        this.tarifaLandings.add(tarifaLanding);
        tarifaLanding.setLanding(this);
        return this;
    }

    public Landing removeTarifaLanding(TarifaLanding tarifaLanding) {
        this.tarifaLandings.remove(tarifaLanding);
        tarifaLanding.setLanding(null);
        return this;
    }

    public void setTarifaLandings(Set<TarifaLanding> tarifaLandings) {
        this.tarifaLandings = tarifaLandings;
    }

    public Sedes getSedes() {
        return sedes;
    }

    public Landing sedes(Sedes sedes) {
        this.sedes = sedes;
        return this;
    }

    public void setSedes(Sedes sedes) {
        this.sedes = sedes;
    }

    public EquipoEmpresas getEquipoEmpresas() {
        return equipoEmpresas;
    }

    public Landing equipoEmpresas(EquipoEmpresas equipoEmpresas) {
        this.equipoEmpresas = equipoEmpresas;
        return this;
    }

    public void setEquipoEmpresas(EquipoEmpresas equipoEmpresas) {
        this.equipoEmpresas = equipoEmpresas;
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
        Landing landing = (Landing) o;
        if (landing.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), landing.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Landing{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", telefonoNegocio='" + getTelefonoNegocio() + "'" +
            ", numeroPuestos=" + getNumeroPuestos() +
            ", numeroOficinas=" + getNumeroOficinas() +
            "}";
    }
}
