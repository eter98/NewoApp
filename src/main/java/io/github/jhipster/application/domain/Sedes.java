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
 * A Sedes.
 */
@Entity
@Table(name = "sedes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "sedes")
public class Sedes implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_sede")
    private Integer nombreSede;

    @Column(name = "coordenada_x")
    private Double coordenadaX;

    @Column(name = "coordenada_y")
    private Double coordenadaY;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "telefono_comunidad")
    private String telefonoComunidad;

    @Column(name = "telefono_negocio")
    private String telefonoNegocio;

    @Column(name = "capacidad_espacio_libre")
    private Integer capacidadEspacioLibre;

    @Lob
    @Column(name = "descripcion_sede")
    private String descripcionSede;

    @Column(name = "horario")
    private String horario;

    @Lob
    @Column(name = "imagen_1")
    private byte[] imagen1;

    @Column(name = "imagen_1_content_type")
    private String imagen1ContentType;

    @Lob
    @Column(name = "imagen_2")
    private byte[] imagen2;

    @Column(name = "imagen_2_content_type")
    private String imagen2ContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private EspacioLibre espacioLibre;

    @OneToOne
    @JoinColumn(unique = true)
    private EspaciosReserva espaciosReserva;

    @OneToOne
    @JoinColumn(unique = true)
    private Landing landing;

    @OneToOne
    @JoinColumn(unique = true)
    private Ciudad ciudad;

    @OneToMany(mappedBy = "sedes")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HostSede> hostSedes = new HashSet<>();
    @OneToOne(mappedBy = "sedes")
    @JsonIgnore
    private EntradaMiembros entradaMiembros;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNombreSede() {
        return nombreSede;
    }

    public Sedes nombreSede(Integer nombreSede) {
        this.nombreSede = nombreSede;
        return this;
    }

    public void setNombreSede(Integer nombreSede) {
        this.nombreSede = nombreSede;
    }

    public Double getCoordenadaX() {
        return coordenadaX;
    }

    public Sedes coordenadaX(Double coordenadaX) {
        this.coordenadaX = coordenadaX;
        return this;
    }

    public void setCoordenadaX(Double coordenadaX) {
        this.coordenadaX = coordenadaX;
    }

    public Double getCoordenadaY() {
        return coordenadaY;
    }

    public Sedes coordenadaY(Double coordenadaY) {
        this.coordenadaY = coordenadaY;
        return this;
    }

    public void setCoordenadaY(Double coordenadaY) {
        this.coordenadaY = coordenadaY;
    }

    public String getDireccion() {
        return direccion;
    }

    public Sedes direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefonoComunidad() {
        return telefonoComunidad;
    }

    public Sedes telefonoComunidad(String telefonoComunidad) {
        this.telefonoComunidad = telefonoComunidad;
        return this;
    }

    public void setTelefonoComunidad(String telefonoComunidad) {
        this.telefonoComunidad = telefonoComunidad;
    }

    public String getTelefonoNegocio() {
        return telefonoNegocio;
    }

    public Sedes telefonoNegocio(String telefonoNegocio) {
        this.telefonoNegocio = telefonoNegocio;
        return this;
    }

    public void setTelefonoNegocio(String telefonoNegocio) {
        this.telefonoNegocio = telefonoNegocio;
    }

    public Integer getCapacidadEspacioLibre() {
        return capacidadEspacioLibre;
    }

    public Sedes capacidadEspacioLibre(Integer capacidadEspacioLibre) {
        this.capacidadEspacioLibre = capacidadEspacioLibre;
        return this;
    }

    public void setCapacidadEspacioLibre(Integer capacidadEspacioLibre) {
        this.capacidadEspacioLibre = capacidadEspacioLibre;
    }

    public String getDescripcionSede() {
        return descripcionSede;
    }

    public Sedes descripcionSede(String descripcionSede) {
        this.descripcionSede = descripcionSede;
        return this;
    }

    public void setDescripcionSede(String descripcionSede) {
        this.descripcionSede = descripcionSede;
    }

    public String getHorario() {
        return horario;
    }

    public Sedes horario(String horario) {
        this.horario = horario;
        return this;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public byte[] getImagen1() {
        return imagen1;
    }

    public Sedes imagen1(byte[] imagen1) {
        this.imagen1 = imagen1;
        return this;
    }

    public void setImagen1(byte[] imagen1) {
        this.imagen1 = imagen1;
    }

    public String getImagen1ContentType() {
        return imagen1ContentType;
    }

    public Sedes imagen1ContentType(String imagen1ContentType) {
        this.imagen1ContentType = imagen1ContentType;
        return this;
    }

    public void setImagen1ContentType(String imagen1ContentType) {
        this.imagen1ContentType = imagen1ContentType;
    }

    public byte[] getImagen2() {
        return imagen2;
    }

    public Sedes imagen2(byte[] imagen2) {
        this.imagen2 = imagen2;
        return this;
    }

    public void setImagen2(byte[] imagen2) {
        this.imagen2 = imagen2;
    }

    public String getImagen2ContentType() {
        return imagen2ContentType;
    }

    public Sedes imagen2ContentType(String imagen2ContentType) {
        this.imagen2ContentType = imagen2ContentType;
        return this;
    }

    public void setImagen2ContentType(String imagen2ContentType) {
        this.imagen2ContentType = imagen2ContentType;
    }

    public EspacioLibre getEspacioLibre() {
        return espacioLibre;
    }

    public Sedes espacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
        return this;
    }

    public void setEspacioLibre(EspacioLibre espacioLibre) {
        this.espacioLibre = espacioLibre;
    }

    public EspaciosReserva getEspaciosReserva() {
        return espaciosReserva;
    }

    public Sedes espaciosReserva(EspaciosReserva espaciosReserva) {
        this.espaciosReserva = espaciosReserva;
        return this;
    }

    public void setEspaciosReserva(EspaciosReserva espaciosReserva) {
        this.espaciosReserva = espaciosReserva;
    }

    public Landing getLanding() {
        return landing;
    }

    public Sedes landing(Landing landing) {
        this.landing = landing;
        return this;
    }

    public void setLanding(Landing landing) {
        this.landing = landing;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Sedes ciudad(Ciudad ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Set<HostSede> getHostSedes() {
        return hostSedes;
    }

    public Sedes hostSedes(Set<HostSede> hostSedes) {
        this.hostSedes = hostSedes;
        return this;
    }

    public Sedes addHostSede(HostSede hostSede) {
        this.hostSedes.add(hostSede);
        hostSede.setSedes(this);
        return this;
    }

    public Sedes removeHostSede(HostSede hostSede) {
        this.hostSedes.remove(hostSede);
        hostSede.setSedes(null);
        return this;
    }

    public void setHostSedes(Set<HostSede> hostSedes) {
        this.hostSedes = hostSedes;
    }

    public EntradaMiembros getEntradaMiembros() {
        return entradaMiembros;
    }

    public Sedes entradaMiembros(EntradaMiembros entradaMiembros) {
        this.entradaMiembros = entradaMiembros;
        return this;
    }

    public void setEntradaMiembros(EntradaMiembros entradaMiembros) {
        this.entradaMiembros = entradaMiembros;
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
        Sedes sedes = (Sedes) o;
        if (sedes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sedes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sedes{" +
            "id=" + getId() +
            ", nombreSede=" + getNombreSede() +
            ", coordenadaX=" + getCoordenadaX() +
            ", coordenadaY=" + getCoordenadaY() +
            ", direccion='" + getDireccion() + "'" +
            ", telefonoComunidad='" + getTelefonoComunidad() + "'" +
            ", telefonoNegocio='" + getTelefonoNegocio() + "'" +
            ", capacidadEspacioLibre=" + getCapacidadEspacioLibre() +
            ", descripcionSede='" + getDescripcionSede() + "'" +
            ", horario='" + getHorario() + "'" +
            ", imagen1='" + getImagen1() + "'" +
            ", imagen1ContentType='" + getImagen1ContentType() + "'" +
            ", imagen2='" + getImagen2() + "'" +
            ", imagen2ContentType='" + getImagen2ContentType() + "'" +
            "}";
    }
}
