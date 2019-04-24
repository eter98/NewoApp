package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.EspacioLibre;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EspacioLibre entity.
 */
public interface EspacioLibreSearchRepository extends ElasticsearchRepository<EspacioLibre, Long> {
}
