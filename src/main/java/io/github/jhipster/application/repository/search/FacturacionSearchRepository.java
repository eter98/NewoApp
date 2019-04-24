package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Facturacion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Facturacion entity.
 */
public interface FacturacionSearchRepository extends ElasticsearchRepository<Facturacion, Long> {
}
