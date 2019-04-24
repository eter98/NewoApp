package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A RegistroCompra.
 */
@Entity
@Table(name = "registro_compra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "registrocompra")
public class RegistroCompra implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Miembros miembros;

    @OneToOne
    @JoinColumn(unique = true)
    private EspacioLibre espacioLibre;

    @OneToOne
    @JoinColumn(unique = true)
    private EntradaInvitados entradaInvitados;

    @ManyToOne
    @JsonIgnoreProperties("registroCompras")
    private Facturacion facturacion;

    @ManyToOne
    @JsonIgnoreProperties("registroCompras")
    private Reservas reservas;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public RegistroCompra miembros(Miembros miembros) {
        this.miembros = miembros;
        return this;
    }

    public void setMiembros(Miembros miembros) {
        this.miembros = miembros;
    }

    public EspacioLibre getEspacioLibre() {
        return espacioLibre;
    }

    public RegistroCompra espacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
        return this;
    }

    public void setEspacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
    }

    public EntradaInvitados getEntradaInvitados() {
        return entradaInvitados;
    }

    public RegistroCompra entradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
        return this;
    }

    public void setEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
    }

    public Facturacion getFacturacion() {
        return facturacion;
    }

    public RegistroCompra facturacion(Facturacion facturacion) {
        this.facturacion = facturacion;
        return this;
    }

    public void setFacturacion(Facturacion facturacion) {
        this.facturacion = facturacion;
    }

    public Reservas getReservas() {
        return reservas;
    }

    public RegistroCompra reservas(Reservas reservas) {
        this.reservas = reservas;
        return this;
    }

    public void setReservas(Reservas reservas) {
        this.reservas = reservas;
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
        RegistroCompra registroCompra = (RegistroCompra) o;
        if (registroCompra.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registroCompra.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RegistroCompra{" +
            "id=" + getId() +
            "}";
    }
}
