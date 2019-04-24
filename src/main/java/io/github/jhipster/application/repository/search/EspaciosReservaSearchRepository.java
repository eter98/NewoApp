package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.EspaciosReserva;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EspaciosReserva entity.
 */
public interface EspaciosReservaSearchRepository extends ElasticsearchRepository<EspaciosReserva, Long> {
}
