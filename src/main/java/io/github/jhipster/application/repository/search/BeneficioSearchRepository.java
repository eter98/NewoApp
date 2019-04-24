package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Beneficio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Beneficio entity.
 */
public interface BeneficioSearchRepository extends ElasticsearchRepository<Beneficio, Long> {
}
