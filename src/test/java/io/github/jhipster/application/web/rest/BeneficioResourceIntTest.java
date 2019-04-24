package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.Beneficio;
import io.github.jhipster.application.repository.BeneficioRepository;
import io.github.jhipster.application.repository.search.BeneficioSearchRepository;
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
 * Test class for the BeneficioResource REST controller.
 *
 * @see BeneficioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class BeneficioResourceIntTest {

    private static final String DEFAULT_TIPO_BENEFICIO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_BENEFICIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_DESCUENTO = 1;
    private static final Integer UPDATED_DESCUENTO = 2;

    @Autowired
    private BeneficioRepository beneficioRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.BeneficioSearchRepositoryMockConfiguration
     */
    @Autowired
    private BeneficioSearchRepository mockBeneficioSearchRepository;

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

    private MockMvc restBeneficioMockMvc;

    private Beneficio beneficio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BeneficioResource beneficioResource = new BeneficioResource(beneficioRepository, mockBeneficioSearchRepository);
        this.restBeneficioMockMvc = MockMvcBuilders.standaloneSetup(beneficioResource)
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
    public static Beneficio createEntity(EntityManager em) {
        Beneficio beneficio = new Beneficio()
            .tipoBeneficio(DEFAULT_TIPO_BENEFICIO)
            .descuento(DEFAULT_DESCUENTO);
        return beneficio;
    }

    @Before
    public void initTest() {
        beneficio = createEntity(em);
    }

    @Test
    @Transactional
    public void createBeneficio() throws Exception {
        int databaseSizeBeforeCreate = beneficioRepository.findAll().size();

        // Create the Beneficio
        restBeneficioMockMvc.perform(post("/api/beneficios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficio)))
            .andExpect(status().isCreated());

        // Validate the Beneficio in the database
        List<Beneficio> beneficioList = beneficioRepository.findAll();
        assertThat(beneficioList).hasSize(databaseSizeBeforeCreate + 1);
        Beneficio testBeneficio = beneficioList.get(beneficioList.size() - 1);
        assertThat(testBeneficio.getTipoBeneficio()).isEqualTo(DEFAULT_TIPO_BENEFICIO);
        assertThat(testBeneficio.getDescuento()).isEqualTo(DEFAULT_DESCUENTO);

        // Validate the Beneficio in Elasticsearch
        verify(mockBeneficioSearchRepository, times(1)).save(testBeneficio);
    }

    @Test
    @Transactional
    public void createBeneficioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = beneficioRepository.findAll().size();

        // Create the Beneficio with an existing ID
        beneficio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBeneficioMockMvc.perform(post("/api/beneficios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficio)))
            .andExpect(status().isBadRequest());

        // Validate the Beneficio in the database
        List<Beneficio> beneficioList = beneficioRepository.findAll();
        assertThat(beneficioList).hasSize(databaseSizeBeforeCreate);

        // Validate the Beneficio in Elasticsearch
        verify(mockBeneficioSearchRepository, times(0)).save(beneficio);
    }

    @Test
    @Transactional
    public void getAllBeneficios() throws Exception {
        // Initialize the database
        beneficioRepository.saveAndFlush(beneficio);

        // Get all the beneficioList
        restBeneficioMockMvc.perform(get("/api/beneficios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(beneficio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoBeneficio").value(hasItem(DEFAULT_TIPO_BENEFICIO.toString())))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO)));
    }
    
    @Test
    @Transactional
    public void getBeneficio() throws Exception {
        // Initialize the database
        beneficioRepository.saveAndFlush(beneficio);

        // Get the beneficio
        restBeneficioMockMvc.perform(get("/api/beneficios/{id}", beneficio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(beneficio.getId().intValue()))
            .andExpect(jsonPath("$.tipoBeneficio").value(DEFAULT_TIPO_BENEFICIO.toString()))
            .andExpect(jsonPath("$.descuento").value(DEFAULT_DESCUENTO));
    }

    @Test
    @Transactional
    public void getNonExistingBeneficio() throws Exception {
        // Get the beneficio
        restBeneficioMockMvc.perform(get("/api/beneficios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBeneficio() throws Exception {
        // Initialize the database
        beneficioRepository.saveAndFlush(beneficio);

        int databaseSizeBeforeUpdate = beneficioRepository.findAll().size();

        // Update the beneficio
        Beneficio updatedBeneficio = beneficioRepository.findById(beneficio.getId()).get();
        // Disconnect from session so that the updates on updatedBeneficio are not directly saved in db
        em.detach(updatedBeneficio);
        updatedBeneficio
            .tipoBeneficio(UPDATED_TIPO_BENEFICIO)
            .descuento(UPDATED_DESCUENTO);

        restBeneficioMockMvc.perform(put("/api/beneficios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBeneficio)))
            .andExpect(status().isOk());

        // Validate the Beneficio in the database
        List<Beneficio> beneficioList = beneficioRepository.findAll();
        assertThat(beneficioList).hasSize(databaseSizeBeforeUpdate);
        Beneficio testBeneficio = beneficioList.get(beneficioList.size() - 1);
        assertThat(testBeneficio.getTipoBeneficio()).isEqualTo(UPDATED_TIPO_BENEFICIO);
        assertThat(testBeneficio.getDescuento()).isEqualTo(UPDATED_DESCUENTO);

        // Validate the Beneficio in Elasticsearch
        verify(mockBeneficioSearchRepository, times(1)).save(testBeneficio);
    }

    @Test
    @Transactional
    public void updateNonExistingBeneficio() throws Exception {
        int databaseSizeBeforeUpdate = beneficioRepository.findAll().size();

        // Create the Beneficio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBeneficioMockMvc.perform(put("/api/beneficios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(beneficio)))
            .andExpect(status().isBadRequest());

        // Validate the Beneficio in the database
        List<Beneficio> beneficioList = beneficioRepository.findAll();
        assertThat(beneficioList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Beneficio in Elasticsearch
        verify(mockBeneficioSearchRepository, times(0)).save(beneficio);
    }

    @Test
    @Transactional
    public void deleteBeneficio() throws Exception {
        // Initialize the database
        beneficioRepository.saveAndFlush(beneficio);

        int databaseSizeBeforeDelete = beneficioRepository.findAll().size();

        // Delete the beneficio
        restBeneficioMockMvc.perform(delete("/api/beneficios/{id}", beneficio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Beneficio> beneficioList = beneficioRepository.findAll();
        assertThat(beneficioList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Beneficio in Elasticsearch
        verify(mockBeneficioSearchRepository, times(1)).deleteById(beneficio.getId());
    }

    @Test
    @Transactional
    public void searchBeneficio() throws Exception {
        // Initialize the database
        beneficioRepository.saveAndFlush(beneficio);
        when(mockBeneficioSearchRepository.search(queryStringQuery("id:" + beneficio.getId())))
            .thenReturn(Collections.singletonList(beneficio));
        // Search the beneficio
        restBeneficioMockMvc.perform(get("/api/_search/beneficios?query=id:" + beneficio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(beneficio.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoBeneficio").value(hasItem(DEFAULT_TIPO_BENEFICIO)))
            .andExpect(jsonPath("$.[*].descuento").value(hasItem(DEFAULT_DESCUENTO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Beneficio.class);
        Beneficio beneficio1 = new Beneficio();
        beneficio1.setId(1L);
        Beneficio beneficio2 = new Beneficio();
        beneficio2.setId(beneficio1.getId());
        assertThat(beneficio1).isEqualTo(beneficio2);
        beneficio2.setId(2L);
        assertThat(beneficio1).isNotEqualTo(beneficio2);
        beneficio1.setId(null);
        assertThat(beneficio1).isNotEqualTo(beneficio2);
    }
}
