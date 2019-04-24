package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A EspacioLibre.
 */
@Entity
@Table(name = "espacio_libre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "espaciolibre")
public class EspacioLibre implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "capacidad_instalada")
    private Integer capacidadInstalada;

    @Column(name = "tipo_de_espacios")
    private Integer tipoDeEspacios;

    @Column(name = "wifi")
    private String wifi;

    @Column(name = "tarifa_1_h_miembro")
    private Integer tarifa1hMiembro;

    @Column(name = "tarifa_2_h_miembro")
    private Integer tarifa2hMiembro;

    @Column(name = "tarifa_3_h_miembro")
    private Integer tarifa3hMiembro;

    @Column(name = "tarifa_4_h_miembro")
    private Integer tarifa4hMiembro;

    @Column(name = "tarifa_5_h_miembro")
    private Integer tarifa5hMiembro;

    @Column(name = "tarifa_6_h_miembro")
    private Integer tarifa6hMiembro;

    @Column(name = "tarifa_7_h_miembro")
    private Integer tarifa7hMiembro;

    @Column(name = "tarifa_8_h_miembro")
    private Integer tarifa8hMiembro;

    @Column(name = "tarifa_1_h_invitado")
    private Integer tarifa1hInvitado;

    @Column(name = "tarifa_2_h_invitado")
    private Integer tarifa2hInvitado;

    @Column(name = "tarifa_3_h_invitado")
    private Integer tarifa3hInvitado;

    @Column(name = "tarifa_4_h_invitado")
    private Integer tarifa4hInvitado;

    @Column(name = "tarifa_5_h_invitado")
    private Integer tarifa5hInvitado;

    @Column(name = "tarifa_6_h_invitado")
    private Integer tarifa6hInvitado;

    @Column(name = "tarifa_7_h_invitado")
    private Integer tarifa7hInvitado;

    @Column(name = "tarifa_8_h_invitado")
    private Integer tarifa8hInvitado;

    @OneToOne(mappedBy = "espacioLibre")
    @JsonIgnore
    private Sedes sedes;

    @OneToOne(mappedBy = "espacioLibre")
    @JsonIgnore
    private Miembros miembros;

    @OneToOne(mappedBy = "espacioLibre")
    @JsonIgnore
    private EntradaInvitados entradaInvitados;

    @OneToOne(mappedBy = "espacioLibre")
    @JsonIgnore
    private RegistroCompra registroCompra;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCapacidadInstalada() {
        return capacidadInstalada;
    }

    public EspacioLibre capacidadInstalada(Integer capacidadInstalada) {
        this.capacidadInstalada = capacidadInstalada;
        return this;
    }

    public void setCapacidadInstalada(Integer capacidadInstalada) {
        this.capacidadInstalada = capacidadInstalada;
    }

    public Integer getTipoDeEspacios() {
        return tipoDeEspacios;
    }

    public EspacioLibre tipoDeEspacios(Integer tipoDeEspacios) {
        this.tipoDeEspacios = tipoDeEspacios;
        return this;
    }

    public void setTipoDeEspacios(Integer tipoDeEspacios) {
        this.tipoDeEspacios = tipoDeEspacios;
    }

    public String getWifi() {
        return wifi;
    }

    public EspacioLibre wifi(String wifi) {
        this.wifi = wifi;
        return this;
    }

    public void setWifi(String wifi) {
        this.wifi = wifi;
    }

    public Integer getTarifa1hMiembro() {
        return tarifa1hMiembro;
    }

    public EspacioLibre tarifa1hMiembro(Integer tarifa1hMiembro) {
        this.tarifa1hMiembro = tarifa1hMiembro;
        return this;
    }

    public void setTarifa1hMiembro(Integer tarifa1hMiembro) {
        this.tarifa1hMiembro = tarifa1hMiembro;
    }

    public Integer getTarifa2hMiembro() {
        return tarifa2hMiembro;
    }

    public EspacioLibre tarifa2hMiembro(Integer tarifa2hMiembro) {
        this.tarifa2hMiembro = tarifa2hMiembro;
        return this;
    }

    public void setTarifa2hMiembro(Integer tarifa2hMiembro) {
        this.tarifa2hMiembro = tarifa2hMiembro;
    }

    public Integer getTarifa3hMiembro() {
        return tarifa3hMiembro;
    }

    public EspacioLibre tarifa3hMiembro(Integer tarifa3hMiembro) {
        this.tarifa3hMiembro = tarifa3hMiembro;
        return this;
    }

    public void setTarifa3hMiembro(Integer tarifa3hMiembro) {
        this.tarifa3hMiembro = tarifa3hMiembro;
    }

    public Integer getTarifa4hMiembro() {
        return tarifa4hMiembro;
    }

    public EspacioLibre tarifa4hMiembro(Integer tarifa4hMiembro) {
        this.tarifa4hMiembro = tarifa4hMiembro;
        return this;
    }

    public void setTarifa4hMiembro(Integer tarifa4hMiembro) {
        this.tarifa4hMiembro = tarifa4hMiembro;
    }

    public Integer getTarifa5hMiembro() {
        return tarifa5hMiembro;
    }

    public EspacioLibre tarifa5hMiembro(Integer tarifa5hMiembro) {
        this.tarifa5hMiembro = tarifa5hMiembro;
        return this;
    }

    public void setTarifa5hMiembro(Integer tarifa5hMiembro) {
        this.tarifa5hMiembro = tarifa5hMiembro;
    }

    public Integer getTarifa6hMiembro() {
        return tarifa6hMiembro;
    }

    public EspacioLibre tarifa6hMiembro(Integer tarifa6hMiembro) {
        this.tarifa6hMiembro = tarifa6hMiembro;
        return this;
    }

    public void setTarifa6hMiembro(Integer tarifa6hMiembro) {
        this.tarifa6hMiembro = tarifa6hMiembro;
    }

    public Integer getTarifa7hMiembro() {
        return tarifa7hMiembro;
    }

    public EspacioLibre tarifa7hMiembro(Integer tarifa7hMiembro) {
        this.tarifa7hMiembro = tarifa7hMiembro;
        return this;
    }

    public void setTarifa7hMiembro(Integer tarifa7hMiembro) {
        this.tarifa7hMiembro = tarifa7hMiembro;
    }

    public Integer getTarifa8hMiembro() {
        return tarifa8hMiembro;
    }

    public EspacioLibre tarifa8hMiembro(Integer tarifa8hMiembro) {
        this.tarifa8hMiembro = tarifa8hMiembro;
        return this;
    }

    public void setTarifa8hMiembro(Integer tarifa8hMiembro) {
        this.tarifa8hMiembro = tarifa8hMiembro;
    }

    public Integer getTarifa1hInvitado() {
        return tarifa1hInvitado;
    }

    public EspacioLibre tarifa1hInvitado(Integer tarifa1hInvitado) {
        this.tarifa1hInvitado = tarifa1hInvitado;
        return this;
    }

    public void setTarifa1hInvitado(Integer tarifa1hInvitado) {
        this.tarifa1hInvitado = tarifa1hInvitado;
    }

    public Integer getTarifa2hInvitado() {
        return tarifa2hInvitado;
    }

    public EspacioLibre tarifa2hInvitado(Integer tarifa2hInvitado) {
        this.tarifa2hInvitado = tarifa2hInvitado;
        return this;
    }

    public void setTarifa2hInvitado(Integer tarifa2hInvitado) {
        this.tarifa2hInvitado = tarifa2hInvitado;
    }

    public Integer getTarifa3hInvitado() {
        return tarifa3hInvitado;
    }

    public EspacioLibre tarifa3hInvitado(Integer tarifa3hInvitado) {
        this.tarifa3hInvitado = tarifa3hInvitado;
        return this;
    }

    public void setTarifa3hInvitado(Integer tarifa3hInvitado) {
        this.tarifa3hInvitado = tarifa3hInvitado;
    }

    public Integer getTarifa4hInvitado() {
        return tarifa4hInvitado;
    }

    public EspacioLibre tarifa4hInvitado(Integer tarifa4hInvitado) {
        this.tarifa4hInvitado = tarifa4hInvitado;
        return this;
    }

    public void setTarifa4hInvitado(Integer tarifa4hInvitado) {
        this.tarifa4hInvitado = tarifa4hInvitado;
    }

    public Integer getTarifa5hInvitado() {
        return tarifa5hInvitado;
    }

    public EspacioLibre tarifa5hInvitado(Integer tarifa5hInvitado) {
        this.tarifa5hInvitado = tarifa5hInvitado;
        return this;
    }

    public void setTarifa5hInvitado(Integer tarifa5hInvitado) {
        this.tarifa5hInvitado = tarifa5hInvitado;
    }

    public Integer getTarifa6hInvitado() {
        return tarifa6hInvitado;
    }

    public EspacioLibre tarifa6hInvitado(Integer tarifa6hInvitado) {
        this.tarifa6hInvitado = tarifa6hInvitado;
        return this;
    }

    public void setTarifa6hInvitado(Integer tarifa6hInvitado) {
        this.tarifa6hInvitado = tarifa6hInvitado;
    }

    public Integer getTarifa7hInvitado() {
        return tarifa7hInvitado;
    }

    public EspacioLibre tarifa7hInvitado(Integer tarifa7hInvitado) {
        this.tarifa7hInvitado = tarifa7hInvitado;
        return this;
    }

    public void setTarifa7hInvitado(Integer tarifa7hInvitado) {
        this.tarifa7hInvitado = tarifa7hInvitado;
    }

    public Integer getTarifa8hInvitado() {
        return tarifa8hInvitado;
    }

    public EspacioLibre tarifa8hInvitado(Integer tarifa8hInvitado) {
        this.tarifa8hInvitado = tarifa8hInvitado;
        return this;
    }

    public void setTarifa8hInvitado(Integer tarifa8hInvitado) {
        this.tarifa8hInvitado = tarifa8hInvitado;
    }

    public Sedes getSedes() {
        return sedes;
    }

    public EspacioLibre sedes(Sedes sedes) {
        this.sedes = sedes;
        return this;
    }

    public void setSedes(Sedes sedes) {
        this.sedes = sedes;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public EspacioLibre miembros(Miembros miembros) {
        this.miembros = miembros;
        return this;
    }

    public void setMiembros(Miembros miembros) {
        this.miembros = miembros;
    }

    public EntradaInvitados getEntradaInvitados() {
        return entradaInvitados;
    }

    public EspacioLibre entradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
        return this;
    }

    public void setEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
    }

    public RegistroCompra getRegistroCompra() {
        return registroCompra;
    }

    public EspacioLibre registroCompra(RegistroCompra registroCompra) {
        this.registroCompra = registroCompra;
        return this;
    }

    public void setRegistroCompra(RegistroCompra registroCompra) {
        this.registroCompra = registroCompra;
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
        EspacioLibre espacioLibre = (EspacioLibre) o;
        if (espacioLibre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), espacioLibre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EspacioLibre{" +
            "id=" + getId() +
            ", capacidadInstalada=" + getCapacidadInstalada() +
            ", tipoDeEspacios=" + getTipoDeEspacios() +
            ", wifi='" + getWifi() + "'" +
            ", tarifa1hMiembro=" + getTarifa1hMiembro() +
            ", tarifa2hMiembro=" + getTarifa2hMiembro() +
            ", tarifa3hMiembro=" + getTarifa3hMiembro() +
            ", tarifa4hMiembro=" + getTarifa4hMiembro() +
            ", tarifa5hMiembro=" + getTarifa5hMiembro() +
            ", tarifa6hMiembro=" + getTarifa6hMiembro() +
            ", tarifa7hMiembro=" + getTarifa7hMiembro() +
            ", tarifa8hMiembro=" + getTarifa8hMiembro() +
            ", tarifa1hInvitado=" + getTarifa1hInvitado() +
            ", tarifa2hInvitado=" + getTarifa2hInvitado() +
            ", tarifa3hInvitado=" + getTarifa3hInvitado() +
            ", tarifa4hInvitado=" + getTarifa4hInvitado() +
            ", tarifa5hInvitado=" + getTarifa5hInvitado() +
            ", tarifa6hInvitado=" + getTarifa6hInvitado() +
            ", tarifa7hInvitado=" + getTarifa7hInvitado() +
            ", tarifa8hInvitado=" + getTarifa8hInvitado() +
            "}";
    }
}
