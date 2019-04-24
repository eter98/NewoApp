package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.PerfilEquipoEmpresa;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerfilEquipoEmpresa entity.
 */
public interface PerfilEquipoEmpresaSearchRepository extends ElasticsearchRepository<PerfilEquipoEmpresa, Long> {
}
