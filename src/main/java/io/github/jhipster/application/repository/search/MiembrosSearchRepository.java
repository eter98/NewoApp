package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Miembros;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Miembros entity.
 */
public interface MiembrosSearchRepository extends ElasticsearchRepository<Miembros, Long> {
}
