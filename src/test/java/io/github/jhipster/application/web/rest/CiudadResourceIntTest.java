package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.Ciudad;
import io.github.jhipster.application.repository.CiudadRepository;
import io.github.jhipster.application.repository.search.CiudadSearchRepository;
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
 * Test class for the CiudadResource REST controller.
 *
 * @see CiudadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class CiudadResourceIntTest {

    private static final String DEFAULT_NOMBRE_CIUDAD = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CIUDAD = "BBBBBBBBBB";

    @Autowired
    private CiudadRepository ciudadRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.CiudadSearchRepositoryMockConfiguration
     */
    @Autowired
    private CiudadSearchRepository mockCiudadSearchRepository;

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

    private MockMvc restCiudadMockMvc;

    private Ciudad ciudad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CiudadResource ciudadResource = new CiudadResource(ciudadRepository, mockCiudadSearchRepository);
        this.restCiudadMockMvc = MockMvcBuilders.standaloneSetup(ciudadResource)
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
    public static Ciudad createEntity(EntityManager em) {
        Ciudad ciudad = new Ciudad()
            .nombreCiudad(DEFAULT_NOMBRE_CIUDAD);
        return ciudad;
    }

    @Before
    public void initTest() {
        ciudad = createEntity(em);
    }

    @Test
    @Transactional
    public void createCiudad() throws Exception {
        int databaseSizeBeforeCreate = ciudadRepository.findAll().size();

        // Create the Ciudad
        restCiudadMockMvc.perform(post("/api/ciudads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ciudad)))
            .andExpect(status().isCreated());

        // Validate the Ciudad in the database
        List<Ciudad> ciudadList = ciudadRepository.findAll();
        assertThat(ciudadList).hasSize(databaseSizeBeforeCreate + 1);
        Ciudad testCiudad = ciudadList.get(ciudadList.size() - 1);
        assertThat(testCiudad.getNombreCiudad()).isEqualTo(DEFAULT_NOMBRE_CIUDAD);

        // Validate the Ciudad in Elasticsearch
        verify(mockCiudadSearchRepository, times(1)).save(testCiudad);
    }

    @Test
    @Transactional
    public void createCiudadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ciudadRepository.findAll().size();

        // Create the Ciudad with an existing ID
        ciudad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCiudadMockMvc.perform(post("/api/ciudads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ciudad)))
            .andExpect(status().isBadRequest());

        // Validate the Ciudad in the database
        List<Ciudad> ciudadList = ciudadRepository.findAll();
        assertThat(ciudadList).hasSize(databaseSizeBeforeCreate);

        // Validate the Ciudad in Elasticsearch
        verify(mockCiudadSearchRepository, times(0)).save(ciudad);
    }

    @Test
    @Transactional
    public void getAllCiudads() throws Exception {
        // Initialize the database
        ciudadRepository.saveAndFlush(ciudad);

        // Get all the ciudadList
        restCiudadMockMvc.perform(get("/api/ciudads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ciudad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCiudad").value(hasItem(DEFAULT_NOMBRE_CIUDAD.toString())));
    }
    
    @Test
    @Transactional
    public void getCiudad() throws Exception {
        // Initialize the database
        ciudadRepository.saveAndFlush(ciudad);

        // Get the ciudad
        restCiudadMockMvc.perform(get("/api/ciudads/{id}", ciudad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ciudad.getId().intValue()))
            .andExpect(jsonPath("$.nombreCiudad").value(DEFAULT_NOMBRE_CIUDAD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCiudad() throws Exception {
        // Get the ciudad
        restCiudadMockMvc.perform(get("/api/ciudads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCiudad() throws Exception {
        // Initialize the database
        ciudadRepository.saveAndFlush(ciudad);

        int databaseSizeBeforeUpdate = ciudadRepository.findAll().size();

        // Update the ciudad
        Ciudad updatedCiudad = ciudadRepository.findById(ciudad.getId()).get();
        // Disconnect from session so that the updates on updatedCiudad are not directly saved in db
        em.detach(updatedCiudad);
        updatedCiudad
            .nombreCiudad(UPDATED_NOMBRE_CIUDAD);

        restCiudadMockMvc.perform(put("/api/ciudads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCiudad)))
            .andExpect(status().isOk());

        // Validate the Ciudad in the database
        List<Ciudad> ciudadList = ciudadRepository.findAll();
        assertThat(ciudadList).hasSize(databaseSizeBeforeUpdate);
        Ciudad testCiudad = ciudadList.get(ciudadList.size() - 1);
        assertThat(testCiudad.getNombreCiudad()).isEqualTo(UPDATED_NOMBRE_CIUDAD);

        // Validate the Ciudad in Elasticsearch
        verify(mockCiudadSearchRepository, times(1)).save(testCiudad);
    }

    @Test
    @Transactional
    public void updateNonExistingCiudad() throws Exception {
        int databaseSizeBeforeUpdate = ciudadRepository.findAll().size();

        // Create the Ciudad

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCiudadMockMvc.perform(put("/api/ciudads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ciudad)))
            .andExpect(status().isBadRequest());

        // Validate the Ciudad in the database
        List<Ciudad> ciudadList = ciudadRepository.findAll();
        assertThat(ciudadList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Ciudad in Elasticsearch
        verify(mockCiudadSearchRepository, times(0)).save(ciudad);
    }

    @Test
    @Transactional
    public void deleteCiudad() throws Exception {
        // Initialize the database
        ciudadRepository.saveAndFlush(ciudad);

        int databaseSizeBeforeDelete = ciudadRepository.findAll().size();

        // Delete the ciudad
        restCiudadMockMvc.perform(delete("/api/ciudads/{id}", ciudad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ciudad> ciudadList = ciudadRepository.findAll();
        assertThat(ciudadList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Ciudad in Elasticsearch
        verify(mockCiudadSearchRepository, times(1)).deleteById(ciudad.getId());
    }

    @Test
    @Transactional
    public void searchCiudad() throws Exception {
        // Initialize the database
        ciudadRepository.saveAndFlush(ciudad);
        when(mockCiudadSearchRepository.search(queryStringQuery("id:" + ciudad.getId())))
            .thenReturn(Collections.singletonList(ciudad));
        // Search the ciudad
        restCiudadMockMvc.perform(get("/api/_search/ciudads?query=id:" + ciudad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ciudad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreCiudad").value(hasItem(DEFAULT_NOMBRE_CIUDAD)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ciudad.class);
        Ciudad ciudad1 = new Ciudad();
        ciudad1.setId(1L);
        Ciudad ciudad2 = new Ciudad();
        ciudad2.setId(ciudad1.getId());
        assertThat(ciudad1).isEqualTo(ciudad2);
        ciudad2.setId(2L);
        assertThat(ciudad1).isNotEqualTo(ciudad2);
        ciudad1.setId(null);
        assertThat(ciudad1).isNotEqualTo(ciudad2);
    }
}
