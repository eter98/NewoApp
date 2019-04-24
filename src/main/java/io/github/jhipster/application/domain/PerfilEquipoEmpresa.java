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
 * A PerfilEquipoEmpresa.
 */
@Entity
@Table(name = "perfil_equipo_empresa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perfilequipoempresa")
public class PerfilEquipoEmpresa implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "inventariable")
    private Integer inventariable;

    @Column(name = "valor")
    private Integer valor;

    @Column(name = "impuesto")
    private Integer impuesto;

    @OneToMany(mappedBy = "perfilEquipoEmpresa")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductosServicios> productosServicios = new HashSet<>();
    @OneToOne(mappedBy = "perfilEquipoEmpresa")
    @JsonIgnore
    private EquipoEmpresas equipoEmpresas;

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

    public PerfilEquipoEmpresa nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public PerfilEquipoEmpresa descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getInventariable() {
        return inventariable;
    }

    public PerfilEquipoEmpresa inventariable(Integer inventariable) {
        this.inventariable = inventariable;
        return this;
    }

    public void setInventariable(Integer inventariable) {
        this.inventariable = inventariable;
    }

    public Integer getValor() {
        return valor;
    }

    public PerfilEquipoEmpresa valor(Integer valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }

    public Integer getImpuesto() {
        return impuesto;
    }

    public PerfilEquipoEmpresa impuesto(Integer impuesto) {
        this.impuesto = impuesto;
        return this;
    }

    public void setImpuesto(Integer impuesto) {
        this.impuesto = impuesto;
    }

    public Set<ProductosServicios> getProductosServicios() {
        return productosServicios;
    }

    public PerfilEquipoEmpresa productosServicios(Set<ProductosServicios> productosServicios) {
        this.productosServicios = productosServicios;
        return this;
    }

    public PerfilEquipoEmpresa addProductosServicios(ProductosServicios productosServicios) {
        this.productosServicios.add(productosServicios);
        productosServicios.setPerfilEquipoEmpresa(this);
        return this;
    }

    public PerfilEquipoEmpresa removeProductosServicios(ProductosServicios productosServicios) {
        this.productosServicios.remove(productosServicios);
        productosServicios.setPerfilEquipoEmpresa(null);
        return this;
    }

    public void setProductosServicios(Set<ProductosServicios> productosServicios) {
        this.productosServicios = productosServicios;
    }

    public EquipoEmpresas getEquipoEmpresas() {
        return equipoEmpresas;
    }

    public PerfilEquipoEmpresa equipoEmpresas(EquipoEmpresas equipoEmpresas) {
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
        PerfilEquipoEmpresa perfilEquipoEmpresa = (PerfilEquipoEmpresa) o;
        if (perfilEquipoEmpresa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perfilEquipoEmpresa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerfilEquipoEmpresa{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", inventariable=" + getInventariable() +
            ", valor=" + getValor() +
            ", impuesto=" + getImpuesto() +
            "}";
    }
}
