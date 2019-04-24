package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TarifaLanding.
 */
@Entity
@Table(name = "tarifa_landing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tarifalanding")
public class TarifaLanding implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tarifa_puesto_mes")
    private Integer tarifaPuestoMes;

    @ManyToOne
    @JsonIgnoreProperties("tarifaLandings")
    private Landing landing;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTarifaPuestoMes() {
        return tarifaPuestoMes;
    }

    public TarifaLanding tarifaPuestoMes(Integer tarifaPuestoMes) {
        this.tarifaPuestoMes = tarifaPuestoMes;
        return this;
    }

    public void setTarifaPuestoMes(Integer tarifaPuestoMes) {
        this.tarifaPuestoMes = tarifaPuestoMes;
    }

    public Landing getLanding() {
        return landing;
    }

    public TarifaLanding landing(Landing landing) {
        this.landing = landing;
        return this;
    }

    public void setLanding(Landing landing) {
        this.landing = landing;
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
        TarifaLanding tarifaLanding = (TarifaLanding) o;
        if (tarifaLanding.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tarifaLanding.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TarifaLanding{" +
            "id=" + getId() +
            ", tarifaPuestoMes=" + getTarifaPuestoMes() +
            "}";
    }
}
