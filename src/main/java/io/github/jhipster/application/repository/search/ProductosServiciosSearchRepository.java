package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.ProductosServicios;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductosServicios entity.
 */
public interface ProductosServiciosSearchRepository extends ElasticsearchRepository<ProductosServicios, Long> {
}
