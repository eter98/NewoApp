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
 * A Invitados.
 */
@Entity
@Table(name = "invitados")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "invitados")
public class Invitados implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "correo")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @OneToMany(mappedBy = "invitados")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EntradaInvitados> entradaInvitados = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("invitados")
    private Miembros miembros;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Invitados nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Invitados apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCorreo() {
        return correo;
    }

    public Invitados correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public Invitados telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Set<EntradaInvitados> getEntradaInvitados() {
        return entradaInvitados;
    }

    public Invitados entradaInvitados(Set<EntradaInvitados> entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
        return this;
    }

    public Invitados addEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados.add(entradaInvitados);
        entradaInvitados.setInvitados(this);
        return this;
    }

    public Invitados removeEntradaInvitados(EntradaInvitados entradaInvitados) {
        this.entradaInvitados.remove(entradaInvitados);
        entradaInvitados.setInvitados(null);
        return this;
    }

    public void setEntradaInvitados(Set<EntradaInvitados> entradaInvitados) {
        this.entradaInvitados = entradaInvitados;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public Invitados miembros(Miembros miembros) {
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
        Invitados invitados = (Invitados) o;
        if (invitados.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invitados.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Invitados{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", telefono='" + getTelefono() + "'" +
            "}";
    }
}
