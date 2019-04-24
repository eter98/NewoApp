package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.EquipoEmpresas;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EquipoEmpresas entity.
 */
public interface EquipoEmpresasSearchRepository extends ElasticsearchRepository<EquipoEmpresas, Long> {
}
