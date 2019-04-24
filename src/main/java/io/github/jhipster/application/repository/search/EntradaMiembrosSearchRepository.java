package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.EntradaMiembros;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EntradaMiembros entity.
 */
public interface EntradaMiembrosSearchRepository extends ElasticsearchRepository<EntradaMiembros, Long> {
}
