package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PerfilMiembro.
 */
@Entity
@Table(name = "perfil_miembro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "perfilmiembro")
public class PerfilMiembro implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "biografia")
    private String biografia;

    @Lob
    @Column(name = "foto_1")
    private byte[] foto1;

    @Column(name = "foto_1_content_type")
    private String foto1ContentType;

    @Lob
    @Column(name = "foto_2")
    private byte[] foto2;

    @Column(name = "foto_2_content_type")
    private String foto2ContentType;

    @Lob
    @Column(name = "fot_3")
    private byte[] fot3;

    @Column(name = "fot_3_content_type")
    private String fot3ContentType;

    @Column(name = "conocimientos_que_domina")
    private String conocimientosQueDomina;

    @Column(name = "temas_de_interes")
    private String temasDeInteres;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "instagram")
    private String instagram;

    @Column(name = "id_google")
    private String idGoogle;

    @Column(name = "twiter")
    private String twiter;

    @OneToOne(mappedBy = "perfilMiembro")
    @JsonIgnore
    private Miembros miembros;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBiografia() {
        return biografia;
    }

    public PerfilMiembro biografia(String biografia) {
        this.biografia = biografia;
        return this;
    }

    public void setBiografia(String biografia) {
        this.biografia = biografia;
    }

    public byte[] getFoto1() {
        return foto1;
    }

    public PerfilMiembro foto1(byte[] foto1) {
        this.foto1 = foto1;
        return this;
    }

    public void setFoto1(byte[] foto1) {
        this.foto1 = foto1;
    }

    public String getFoto1ContentType() {
        return foto1ContentType;
    }

    public PerfilMiembro foto1ContentType(String foto1ContentType) {
        this.foto1ContentType = foto1ContentType;
        return this;
    }

    public void setFoto1ContentType(String foto1ContentType) {
        this.foto1ContentType = foto1ContentType;
    }

    public byte[] getFoto2() {
        return foto2;
    }

    public PerfilMiembro foto2(byte[] foto2) {
        this.foto2 = foto2;
        return this;
    }

    public void setFoto2(byte[] foto2) {
        this.foto2 = foto2;
    }

    public String getFoto2ContentType() {
        return foto2ContentType;
    }

    public PerfilMiembro foto2ContentType(String foto2ContentType) {
        this.foto2ContentType = foto2ContentType;
        return this;
    }

    public void setFoto2ContentType(String foto2ContentType) {
        this.foto2ContentType = foto2ContentType;
    }

    public byte[] getFot3() {
        return fot3;
    }

    public PerfilMiembro fot3(byte[] fot3) {
        this.fot3 = fot3;
        return this;
    }

    public void setFot3(byte[] fot3) {
        this.fot3 = fot3;
    }

    public String getFot3ContentType() {
        return fot3ContentType;
    }

    public PerfilMiembro fot3ContentType(String fot3ContentType) {
        this.fot3ContentType = fot3ContentType;
        return this;
    }

    public void setFot3ContentType(String fot3ContentType) {
        this.fot3ContentType = fot3ContentType;
    }

    public String getConocimientosQueDomina() {
        return conocimientosQueDomina;
    }

    public PerfilMiembro conocimientosQueDomina(String conocimientosQueDomina) {
        this.conocimientosQueDomina = conocimientosQueDomina;
        return this;
    }

    public void setConocimientosQueDomina(String conocimientosQueDomina) {
        this.conocimientosQueDomina = conocimientosQueDomina;
    }

    public String getTemasDeInteres() {
        return temasDeInteres;
    }

    public PerfilMiembro temasDeInteres(String temasDeInteres) {
        this.temasDeInteres = temasDeInteres;
        return this;
    }

    public void setTemasDeInteres(String temasDeInteres) {
        this.temasDeInteres = temasDeInteres;
    }

    public String getFacebook() {
        return facebook;
    }

    public PerfilMiembro facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getInstagram() {
        return instagram;
    }

    public PerfilMiembro instagram(String instagram) {
        this.instagram = instagram;
        return this;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getIdGoogle() {
        return idGoogle;
    }

    public PerfilMiembro idGoogle(String idGoogle) {
        this.idGoogle = idGoogle;
        return this;
    }

    public void setIdGoogle(String idGoogle) {
        this.idGoogle = idGoogle;
    }

    public String getTwiter() {
        return twiter;
    }

    public PerfilMiembro twiter(String twiter) {
        this.twiter = twiter;
        return this;
    }

    public void setTwiter(String twiter) {
        this.twiter = twiter;
    }

    public Miembros getMiembros() {
        return miembros;
    }

    public PerfilMiembro miembros(Miembros miembros) {
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
        PerfilMiembro perfilMiembro = (PerfilMiembro) o;
        if (perfilMiembro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perfilMiembro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PerfilMiembro{" +
            "id=" + getId() +
            ", biografia='" + getBiografia() + "'" +
            ", foto1='" + getFoto1() + "'" +
            ", foto1ContentType='" + getFoto1ContentType() + "'" +
            ", foto2='" + getFoto2() + "'" +
            ", foto2ContentType='" + getFoto2ContentType() + "'" +
            ", fot3='" + getFot3() + "'" +
            ", fot3ContentType='" + getFot3ContentType() + "'" +
            ", conocimientosQueDomina='" + getConocimientosQueDomina() + "'" +
            ", temasDeInteres='" + getTemasDeInteres() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", instagram='" + getInstagram() + "'" +
            ", idGoogle='" + getIdGoogle() + "'" +
            ", twiter='" + getTwiter() + "'" +
            "}";
    }
}
