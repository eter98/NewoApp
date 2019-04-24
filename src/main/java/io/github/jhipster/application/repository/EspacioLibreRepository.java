package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EspacioLibre;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EspacioLibre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspacioLibreRepository extends JpaRepository<EspacioLibre, Long> {

}
