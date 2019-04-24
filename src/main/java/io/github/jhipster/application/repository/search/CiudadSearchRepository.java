package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Ciudad;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ciudad entity.
 */
public interface CiudadSearchRepository extends ElasticsearchRepository<Ciudad, Long> {
}
