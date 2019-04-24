package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Pais;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Pais entity.
 */
public interface PaisSearchRepository extends ElasticsearchRepository<Pais, Long> {
}
