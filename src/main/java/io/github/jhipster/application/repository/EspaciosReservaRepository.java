package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EspaciosReserva;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EspaciosReserva entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspaciosReservaRepository extends JpaRepository<EspaciosReserva, Long> {

}
