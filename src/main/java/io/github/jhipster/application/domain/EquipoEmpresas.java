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
 * A EquipoEmpresas.
 */
@Entity
@Table(name = "equipo_empresas")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "equipoempresas")
public class EquipoEmpresas implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo")
    private String correo;

    @Column(name = "direccion")
    private String direccion;

    @Lob
    @Column(name = "descripcion")
    private String descripcion;

    @Lob
    @Column(name = "logos")
    private byte[] logos;

    @Column(name = "logos_content_type")
    private String logosContentType;

    @Column(name = "pagina_web")
    private String paginaWeb;

    @OneToOne
    @JoinColumn(unique = true)
    private Miembros miembros;

    @OneToOne
    @JoinColumn(unique = true)
    private Facturacion facturacion;

    @OneToOne
    @JoinColumn(unique = true)
    private PerfilEquipoEmpresa perfilEquipoEmpresa;

    @OneToMany(mappedBy = "equipoEmpresas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Landing> landings = new HashSet<>();
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

    public EquipoEmpresas nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public EquipoEmpresas telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public EquipoEmpresas correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDireccion() {
        return direccion;
    }

    public EquipoEmpresas direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public EquipoEmpresas descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getLogos() {
        return logos;
    }

    public EquipoEmpresas logos(byte[] logos) {
        this.logos = logos;
        return this;
    }

    public void setLogos(byte[] logos) {
        this.logos = logos;
    }

    public String getLogosContentType() {
        return logosContentType;
    }

    public EquipoEmpresas logosContentType(String logosContentType) {
        this.logosContentType = logosContentType;
        return this;
    }

    public void setLogosContentType(String logosContentType) {
        this.logosContentType = logosContentType;
    }

    public String getPaginaWeb() {
        return paginaWeb;
    }

    public EquipoEmpresas paginaWeb(String paginaWeb) {
        this.paginaWeb = paginaWeb;
        return this;
    }

    public void setPaginaWeb(String paginaWeb) {
        this.paginaWeb = paginaWeb;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public EquipoEmpresas miembros(Miembros miembros) {
        this.miembros = miembros;
        return this;
    }

    public void setMiembros(Miembros miembros) {
        this.miembros = miembros;
    }

    public Facturacion getFacturacion() {
        return facturacion;
    }

    public EquipoEmpresas facturacion(Facturacion facturacion) {
        this.facturacion = facturacion;
        return this;
    }

    public void setFacturacion(Facturacion facturacion) {
        this.facturacion = facturacion;
    }

    public PerfilEquipoEmpresa getPerfilEquipoEmpresa() {
        return perfilEquipoEmpresa;
    }

    public EquipoEmpresas perfilEquipoEmpresa(PerfilEquipoEmpresa perfilEquipoEmpresa) {
        this.perfilEquipoEmpresa = perfilEquipoEmpresa;
        return this;
    }

    public void setPerfilEquipoEmpresa(PerfilEquipoEmpresa perfilEquipoEmpresa) {
        this.perfilEquipoEmpresa = perfilEquipoEmpresa;
    }

    public Set<Landing> getLandings() {
        return landings;
    }

    public EquipoEmpresas landings(Set<Landing> landings) {
        this.landings = landings;
        return this;
    }

    public EquipoEmpresas addLanding(Landing landing) {
        this.landings.add(landing);
        landing.setEquipoEmpresas(this);
        return this;
    }

    public EquipoEmpresas removeLanding(Landing landing) {
        this.landings.remove(landing);
        landing.setEquipoEmpresas(null);
        return this;
    }

    public void setLandings(Set<Landing> landings) {
        this.landings = landings;
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
        EquipoEmpresas equipoEmpresas = (EquipoEmpresas) o;
        if (equipoEmpresas.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), equipoEmpresas.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EquipoEmpresas{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", logos='" + getLogos() + "'" +
            ", logosContentType='" + getLogosContentType() + "'" +
            ", paginaWeb='" + getPaginaWeb() + "'" +
            "}";
    }
}
