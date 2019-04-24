package io.github.jhipster.application.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of PerfilMiembroSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PerfilMiembroSearchRepositoryMockConfiguration {

    @MockBean
    private PerfilMiembroSearchRepository mockPerfilMiembroSearchRepository;

}
