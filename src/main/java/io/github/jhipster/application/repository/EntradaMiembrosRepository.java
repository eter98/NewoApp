package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EntradaMiembros;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntradaMiembros entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntradaMiembrosRepository extends JpaRepository<EntradaMiembros, Long> {

}
