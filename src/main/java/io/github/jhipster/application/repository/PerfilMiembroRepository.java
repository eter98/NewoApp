package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.PerfilMiembro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PerfilMiembro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerfilMiembroRepository extends JpaRepository<PerfilMiembro, Long> {

}
