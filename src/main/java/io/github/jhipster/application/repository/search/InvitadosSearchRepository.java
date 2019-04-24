package io.github.jhipster.application.repository.search;

import io.github.jhipster.application.domain.Invitados;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Invitados entity.
 */
public interface InvitadosSearchRepository extends ElasticsearchRepository<Invitados, Long> {
}
