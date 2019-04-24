package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Beneficio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Beneficio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BeneficioRepository extends JpaRepository<Beneficio, Long> {

}
