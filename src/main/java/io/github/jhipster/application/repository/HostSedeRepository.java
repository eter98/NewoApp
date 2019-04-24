package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.HostSede;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HostSede entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HostSedeRepository extends JpaRepository<HostSede, Long> {

}
