package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Reservas.
 */
@Entity
@Table(name = "reservas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "reservas")
public class Reservas implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_entrada")
    private LocalDate fechaEntrada;

    @Column(name = "hora_entrada")
    private String horaEntrada;

    @Column(name = "fecha_salida")
    private LocalDate fechaSalida;

    @Column(name = "hora_salida")
    private String horaSalida;

    @OneToOne
    @JoinColumn(unique = true)
    private EspaciosReserva espaciosReserva;

    @OneToMany(mappedBy = "reservas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EntradaInvitados> entradaInvitados = new HashSet<>();
    @OneToMany(mappedBy = "reservas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RegistroCompra> registroCompras = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("reservas")
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

    public Reservas fechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
        return this;
    }

    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public String getHoraEntrada() {
        return horaEntrada;
    }

    public Reservas horaEntrada(String horaEntrada) {
        this.horaEntrada = horaEntrada;
        return this;
    }

    public void setHoraEntrada(String horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public Reservas fechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
        return this;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getHoraSalida() {
        return horaSalida;
    }

    public Reservas horaSalida(String horaSalida) {
        this.horaSalida = horaSalida;
        return this;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public EspaciosReserva getEspaciosReserva() {
        return espaciosReserva;
    }

    public Reservas espaciosReserva(EspaciosReserva espaciosReserva) {
        this.espaciosReserva = espaciosReserva;
        return this;
    }

    public void setEspaciosReserva(EspaciosReserva espaciosReserva) {
        this.espaciosReserva = espaciosReserva;
    }

    public Set<EntradaInvitados> getEntradaInvitados() {
        return entradaInvitados;
    }

    public Reservas entradaInvitados(Set<EntradaInvitados> entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
        return this;
    }

    public Reservas addEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados.add(entradaInvitados);
        entradaInvitados.setReservas(this);
        return this;
    }

    public Reservas removeEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados.remove(entradaInvitados);
        entradaInvitados.setReservas(null);
        return this;
    }

    public void setEntradaInvitados(Set<EntradaInvitados> entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
    }

    public Set<RegistroCompra> getRegistroCompras() {
        return registroCompras;
    }

    public Reservas registroCompras(Set<RegistroCompra> registroCompras) {
        this.registroCompras = registroCompras;
        return this;
    }

    public Reservas addRegistroCompra(RegistroCompra registroCompra) {
        this.registroCompras.add(registroCompra);
        registroCompra.setReservas(this);
        return this;
    }

    public Reservas removeRegistroCompra(RegistroCompra registroCompra) {
        this.registroCompras.remove(registroCompra);
        registroCompra.setReservas(null);
        return this;
    }

    public void setRegistroCompras(Set<RegistroCompra> registroCompras) {
        this.registroCompras = registroCompras;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public Reservas miembros(Miembros miembros) {
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
        Reservas reservas = (Reservas) o;
        if (reservas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservas{" +
            "id=" + getId() +
            ", fechaEntrada='" + getFechaEntrada() + "'" +
            ", horaEntrada='" + getHoraEntrada() + "'" +
            ", fechaSalida='" + getFechaSalida() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            "}";
    }
}
