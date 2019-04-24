package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A EntradaInvitados.
 */
@Entity
@Table(name = "entrada_invitados")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "entradainvitados")
public class EntradaInvitados implements Serializable {

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
    private EspacioLibre espacioLibre;

    @OneToOne(mappedBy = "entradaInvitados")
    @JsonIgnore
    private RegistroCompra registroCompra;

    @ManyToOne
    @JsonIgnoreProperties("entradaInvitados")
    private Invitados invitados;

    @ManyToOne
    @JsonIgnoreProperties("entradaInvitados")
    private Reservas reservas;

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

    public EntradaInvitados fechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
        return this;
    }

    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public String getHoraEntrada() {
        return horaEntrada;
    }

    public EntradaInvitados horaEntrada(String horaEntrada) {
        this.horaEntrada = horaEntrada;
        return this;
    }

    public void setHoraEntrada(String horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public EntradaInvitados fechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
        return this;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public String getHoraSalida() {
        return horaSalida;
    }

    public EntradaInvitados horaSalida(String horaSalida) {
        this.horaSalida = horaSalida;
        return this;
    }

    public void setHoraSalida(String horaSalida) {
        this.horaSalida = horaSalida;
    }

    public EspacioLibre getEspacioLibre() {
        return espacioLibre;
    }

    public EntradaInvitados espacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
        return this;
    }

    public void setEspacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
    }

    public RegistroCompra getRegistroCompra() {
        return registroCompra;
    }

    public EntradaInvitados registroCompra(RegistroCompra registroCompra) {
        this.registroCompra = registroCompra;
        return this;
    }

    public void setRegistroCompra(RegistroCompra registroCompra) {
        this.registroCompra = registroCompra;
    }

    public Invitados getInvitados() {
        return invitados;
    }

    public EntradaInvitados invitados(Invitados invitados) {
        this.invitados = invitados;
        return this;
    }

    public void setInvitados(Invitados invitados) {
        this.invitados = invitados;
    }

    public Reservas getReservas() {
        return reservas;
    }

    public EntradaInvitados reservas(Reservas reservas) {
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
        EntradaInvitados entradaInvitados = (EntradaInvitados) o;
        if (entradaInvitados.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entradaInvitados.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntradaInvitados{" +
            "id=" + getId() +
            ", fechaEntrada='" + getFechaEntrada() + "'" +
            ", horaEntrada='" + getHoraEntrada() + "'" +
            ", fechaSalida='" + getFechaSalida() + "'" +
            ", horaSalida='" + getHoraSalida() + "'" +
            "}";
    }
}
