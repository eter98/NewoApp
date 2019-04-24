package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductosServicios.
 */
@Entity
@Table(name = "productos_servicios")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "productosservicios")
public class ProductosServicios implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre_producto")
    private String nombreProducto;

    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @Column(name = "foto_content_type")
    private String fotoContentType;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "inventariables")
    private Integer inventariables;

    @Column(name = "valor")
    private Integer valor;

    @Column(name = "impuesto")
    private Integer impuesto;

    @ManyToOne
    @JsonIgnoreProperties("productosServicios")
    private PerfilEquipoEmpresa perfilEquipoEmpresa;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public ProductosServicios nombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
        return this;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public byte[] getFoto() {
        return foto;
    }

    public ProductosServicios foto(byte[] foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public String getFotoContentType() {
        return fotoContentType;
    }

    public ProductosServicios fotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
        return this;
    }

    public void setFotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public ProductosServicios descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getInventariables() {
        return inventariables;
    }

    public ProductosServicios inventariables(Integer inventariables) {
        this.inventariables = inventariables;
        return this;
    }

    public void setInventariables(Integer inventariables) {
        this.inventariables = inventariables;
    }

    public Integer getValor() {
        return valor;
    }

    public ProductosServicios valor(Integer valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }

    public Integer getImpuesto() {
        return impuesto;
    }

    public ProductosServicios impuesto(Integer impuesto) {
        this.impuesto = impuesto;
        return this;
    }

    public void setImpuesto(Integer impuesto) {
        this.impuesto = impuesto;
    }

    public PerfilEquipoEmpresa getPerfilEquipoEmpresa() {
        return perfilEquipoEmpresa;
    }

    public ProductosServicios perfilEquipoEmpresa(PerfilEquipoEmpresa perfilEquipoEmpresa) {
        this.perfilEquipoEmpresa = perfilEquipoEmpresa;
        return this;
    }

    public void setPerfilEquipoEmpresa(PerfilEquipoEmpresa perfilEquipoEmpresa) {
        this.perfilEquipoEmpresa = perfilEquipoEmpresa;
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
        ProductosServicios productosServicios = (ProductosServicios) o;
        if (productosServicios.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productosServicios.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductosServicios{" +
            "id=" + getId() +
            ", nombreProducto='" + getNombreProducto() + "'" +
            ", foto='" + getFoto() + "'" +
            ", fotoContentType='" + getFotoContentType() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", inventariables=" + getInventariables() +
            ", valor=" + getValor() +
            ", impuesto=" + getImpuesto() +
            "}";
    }
}
