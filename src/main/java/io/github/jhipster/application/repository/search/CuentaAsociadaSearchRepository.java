package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.CuentaAsociada;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CuentaAsociada entity.
 */
public interface CuentaAsociadaSearchRepository extends ElasticsearchRepository<CuentaAsociada, Long> {
}
