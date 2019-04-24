package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.ProductosServicios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductosServicios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductosServiciosRepository extends JpaRepository<ProductosServicios, Long> {

}
