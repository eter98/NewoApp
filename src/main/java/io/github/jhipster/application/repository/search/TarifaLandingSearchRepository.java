package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.TarifaLanding;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TarifaLanding entity.
 */
public interface TarifaLandingSearchRepository extends ElasticsearchRepository<TarifaLanding, Long> {
}
