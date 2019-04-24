package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.TarifaLanding;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TarifaLanding entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarifaLandingRepository extends JpaRepository<TarifaLanding, Long> {

}
