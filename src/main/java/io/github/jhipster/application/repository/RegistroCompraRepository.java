package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.RegistroCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RegistroCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegistroCompraRepository extends JpaRepository<RegistroCompra, Long> {

}
