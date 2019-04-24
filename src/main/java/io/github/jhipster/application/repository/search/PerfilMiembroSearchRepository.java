package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.PerfilMiembro;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PerfilMiembro entity.
 */
public interface PerfilMiembroSearchRepository extends ElasticsearchRepository<PerfilMiembro, Long> {
}
