package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.TarifaLanding;
import io.github.jhipster.application.repository.TarifaLandingRepository;
import io.github.jhipster.application.repository.search.TarifaLandingSearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TarifaLandingResource REST controller.
 *
 * @see TarifaLandingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class TarifaLandingResourceIntTest {

    private static final Integer DEFAULT_TARIFA_PUESTO_MES = 1;
    private static final Integer UPDATED_TARIFA_PUESTO_MES = 2;

    @Autowired
    private TarifaLandingRepository tarifaLandingRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.TarifaLandingSearchRepositoryMockConfiguration
     */
    @Autowired
    private TarifaLandingSearchRepository mockTarifaLandingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTarifaLandingMockMvc;

    private TarifaLanding tarifaLanding;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TarifaLandingResource tarifaLandingResource = new TarifaLandingResource(tarifaLandingRepository, mockTarifaLandingSearchRepository);
        this.restTarifaLandingMockMvc = MockMvcBuilders.standaloneSetup(tarifaLandingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifaLanding createEntity(EntityManager em) {
        TarifaLanding tarifaLanding = new TarifaLanding()
            .tarifaPuestoMes(DEFAULT_TARIFA_PUESTO_MES);
        return tarifaLanding;
    }

    @Before
    public void initTest() {
        tarifaLanding = createEntity(em);
    }

    @Test
    @Transactional
    public void createTarifaLanding() throws Exception {
        int databaseSizeBeforeCreate = tarifaLandingRepository.findAll().size();

        // Create the TarifaLanding
        restTarifaLandingMockMvc.perform(post("/api/tarifa-landings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifaLanding)))
            .andExpect(status().isCreated());

        // Validate the TarifaLanding in the database
        List<TarifaLanding> tarifaLandingList = tarifaLandingRepository.findAll();
        assertThat(tarifaLandingList).hasSize(databaseSizeBeforeCreate + 1);
        TarifaLanding testTarifaLanding = tarifaLandingList.get(tarifaLandingList.size() - 1);
        assertThat(testTarifaLanding.getTarifaPuestoMes()).isEqualTo(DEFAULT_TARIFA_PUESTO_MES);

        // Validate the TarifaLanding in Elasticsearch
        verify(mockTarifaLandingSearchRepository, times(1)).save(testTarifaLanding);
    }

    @Test
    @Transactional
    public void createTarifaLandingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tarifaLandingRepository.findAll().size();

        // Create the TarifaLanding with an existing ID
        tarifaLanding.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifaLandingMockMvc.perform(post("/api/tarifa-landings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifaLanding)))
            .andExpect(status().isBadRequest());

        // Validate the TarifaLanding in the database
        List<TarifaLanding> tarifaLandingList = tarifaLandingRepository.findAll();
        assertThat(tarifaLandingList).hasSize(databaseSizeBeforeCreate);

        // Validate the TarifaLanding in Elasticsearch
        verify(mockTarifaLandingSearchRepository, times(0)).save(tarifaLanding);
    }

    @Test
    @Transactional
    public void getAllTarifaLandings() throws Exception {
        // Initialize the database
        tarifaLandingRepository.saveAndFlush(tarifaLanding);

        // Get all the tarifaLandingList
        restTarifaLandingMockMvc.perform(get("/api/tarifa-landings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifaLanding.getId().intValue())))
            .andExpect(jsonPath("$.[*].tarifaPuestoMes").value(hasItem(DEFAULT_TARIFA_PUESTO_MES)));
    }
    
    @Test
    @Transactional
    public void getTarifaLanding() throws Exception {
        // Initialize the database
        tarifaLandingRepository.saveAndFlush(tarifaLanding);

        // Get the tarifaLanding
        restTarifaLandingMockMvc.perform(get("/api/tarifa-landings/{id}", tarifaLanding.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tarifaLanding.getId().intValue()))
            .andExpect(jsonPath("$.tarifaPuestoMes").value(DEFAULT_TARIFA_PUESTO_MES));
    }

    @Test
    @Transactional
    public void getNonExistingTarifaLanding() throws Exception {
        // Get the tarifaLanding
        restTarifaLandingMockMvc.perform(get("/api/tarifa-landings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTarifaLanding() throws Exception {
        // Initialize the database
        tarifaLandingRepository.saveAndFlush(tarifaLanding);

        int databaseSizeBeforeUpdate = tarifaLandingRepository.findAll().size();

        // Update the tarifaLanding
        TarifaLanding updatedTarifaLanding = tarifaLandingRepository.findById(tarifaLanding.getId()).get();
        // Disconnect from session so that the updates on updatedTarifaLanding are not directly saved in db
        em.detach(updatedTarifaLanding);
        updatedTarifaLanding
            .tarifaPuestoMes(UPDATED_TARIFA_PUESTO_MES);

        restTarifaLandingMockMvc.perform(put("/api/tarifa-landings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarifaLanding)))
            .andExpect(status().isOk());

        // Validate the TarifaLanding in the database
        List<TarifaLanding> tarifaLandingList = tarifaLandingRepository.findAll();
        assertThat(tarifaLandingList).hasSize(databaseSizeBeforeUpdate);
        TarifaLanding testTarifaLanding = tarifaLandingList.get(tarifaLandingList.size() - 1);
        assertThat(testTarifaLanding.getTarifaPuestoMes()).isEqualTo(UPDATED_TARIFA_PUESTO_MES);

        // Validate the TarifaLanding in Elasticsearch
        verify(mockTarifaLandingSearchRepository, times(1)).save(testTarifaLanding);
    }

    @Test
    @Transactional
    public void updateNonExistingTarifaLanding() throws Exception {
        int databaseSizeBeforeUpdate = tarifaLandingRepository.findAll().size();

        // Create the TarifaLanding

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifaLandingMockMvc.perform(put("/api/tarifa-landings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarifaLanding)))
            .andExpect(status().isBadRequest());

        // Validate the TarifaLanding in the database
        List<TarifaLanding> tarifaLandingList = tarifaLandingRepository.findAll();
        assertThat(tarifaLandingList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TarifaLanding in Elasticsearch
        verify(mockTarifaLandingSearchRepository, times(0)).save(tarifaLanding);
    }

    @Test
    @Transactional
    public void deleteTarifaLanding() throws Exception {
        // Initialize the database
        tarifaLandingRepository.saveAndFlush(tarifaLanding);

        int databaseSizeBeforeDelete = tarifaLandingRepository.findAll().size();

        // Delete the tarifaLanding
        restTarifaLandingMockMvc.perform(delete("/api/tarifa-landings/{id}", tarifaLanding.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TarifaLanding> tarifaLandingList = tarifaLandingRepository.findAll();
        assertThat(tarifaLandingList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TarifaLanding in Elasticsearch
        verify(mockTarifaLandingSearchRepository, times(1)).deleteById(tarifaLanding.getId());
    }

    @Test
    @Transactional
    public void searchTarifaLanding() throws Exception {
        // Initialize the database
        tarifaLandingRepository.saveAndFlush(tarifaLanding);
        when(mockTarifaLandingSearchRepository.search(queryStringQuery("id:" + tarifaLanding.getId())))
            .thenReturn(Collections.singletonList(tarifaLanding));
        // Search the tarifaLanding
        restTarifaLandingMockMvc.perform(get("/api/_search/tarifa-landings?query=id:" + tarifaLanding.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifaLanding.getId().intValue())))
            .andExpect(jsonPath("$.[*].tarifaPuestoMes").value(hasItem(DEFAULT_TARIFA_PUESTO_MES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TarifaLanding.class);
        TarifaLanding tarifaLanding1 = new TarifaLanding();
        tarifaLanding1.setId(1L);
        TarifaLanding tarifaLanding2 = new TarifaLanding();
        tarifaLanding2.setId(tarifaLanding1.getId());
        assertThat(tarifaLanding1).isEqualTo(tarifaLanding2);
        tarifaLanding2.setId(2L);
        assertThat(tarifaLanding1).isNotEqualTo(tarifaLanding2);
        tarifaLanding1.setId(null);
        assertThat(tarifaLanding1).isNotEqualTo(tarifaLanding2);
    }
}
