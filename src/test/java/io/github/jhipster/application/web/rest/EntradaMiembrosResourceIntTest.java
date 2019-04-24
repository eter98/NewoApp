package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.EntradaMiembros;
import io.github.jhipster.application.repository.EntradaMiembrosRepository;
import io.github.jhipster.application.repository.search.EntradaMiembrosSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Test class for the EntradaMiembrosResource REST controller.
 *
 * @see EntradaMiembrosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class EntradaMiembrosResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_ENTRADA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ENTRADA = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_SALIDA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SALIDA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EntradaMiembrosRepository entradaMiembrosRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EntradaMiembrosSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntradaMiembrosSearchRepository mockEntradaMiembrosSearchRepository;

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

    private MockMvc restEntradaMiembrosMockMvc;

    private EntradaMiembros entradaMiembros;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntradaMiembrosResource entradaMiembrosResource = new EntradaMiembrosResource(entradaMiembrosRepository, mockEntradaMiembrosSearchRepository);
        this.restEntradaMiembrosMockMvc = MockMvcBuilders.standaloneSetup(entradaMiembrosResource)
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
    public static EntradaMiembros createEntity(EntityManager em) {
        EntradaMiembros entradaMiembros = new EntradaMiembros()
            .fechaEntrada(DEFAULT_FECHA_ENTRADA)
            .fechaSalida(DEFAULT_FECHA_SALIDA);
        return entradaMiembros;
    }

    @Before
    public void initTest() {
        entradaMiembros = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntradaMiembros() throws Exception {
        int databaseSizeBeforeCreate = entradaMiembrosRepository.findAll().size();

        // Create the EntradaMiembros
        restEntradaMiembrosMockMvc.perform(post("/api/entrada-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entradaMiembros)))
            .andExpect(status().isCreated());

        // Validate the EntradaMiembros in the database
        List<EntradaMiembros> entradaMiembrosList = entradaMiembrosRepository.findAll();
        assertThat(entradaMiembrosList).hasSize(databaseSizeBeforeCreate + 1);
        EntradaMiembros testEntradaMiembros = entradaMiembrosList.get(entradaMiembrosList.size() - 1);
        assertThat(testEntradaMiembros.getFechaEntrada()).isEqualTo(DEFAULT_FECHA_ENTRADA);
        assertThat(testEntradaMiembros.getFechaSalida()).isEqualTo(DEFAULT_FECHA_SALIDA);

        // Validate the EntradaMiembros in Elasticsearch
        verify(mockEntradaMiembrosSearchRepository, times(1)).save(testEntradaMiembros);
    }

    @Test
    @Transactional
    public void createEntradaMiembrosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entradaMiembrosRepository.findAll().size();

        // Create the EntradaMiembros with an existing ID
        entradaMiembros.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntradaMiembrosMockMvc.perform(post("/api/entrada-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entradaMiembros)))
            .andExpect(status().isBadRequest());

        // Validate the EntradaMiembros in the database
        List<EntradaMiembros> entradaMiembrosList = entradaMiembrosRepository.findAll();
        assertThat(entradaMiembrosList).hasSize(databaseSizeBeforeCreate);

        // Validate the EntradaMiembros in Elasticsearch
        verify(mockEntradaMiembrosSearchRepository, times(0)).save(entradaMiembros);
    }

    @Test
    @Transactional
    public void getAllEntradaMiembros() throws Exception {
        // Initialize the database
        entradaMiembrosRepository.saveAndFlush(entradaMiembros);

        // Get all the entradaMiembrosList
        restEntradaMiembrosMockMvc.perform(get("/api/entrada-miembros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entradaMiembros.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaEntrada").value(hasItem(DEFAULT_FECHA_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].fechaSalida").value(hasItem(DEFAULT_FECHA_SALIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getEntradaMiembros() throws Exception {
        // Initialize the database
        entradaMiembrosRepository.saveAndFlush(entradaMiembros);

        // Get the entradaMiembros
        restEntradaMiembrosMockMvc.perform(get("/api/entrada-miembros/{id}", entradaMiembros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entradaMiembros.getId().intValue()))
            .andExpect(jsonPath("$.fechaEntrada").value(DEFAULT_FECHA_ENTRADA.toString()))
            .andExpect(jsonPath("$.fechaSalida").value(DEFAULT_FECHA_SALIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntradaMiembros() throws Exception {
        // Get the entradaMiembros
        restEntradaMiembrosMockMvc.perform(get("/api/entrada-miembros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntradaMiembros() throws Exception {
        // Initialize the database
        entradaMiembrosRepository.saveAndFlush(entradaMiembros);

        int databaseSizeBeforeUpdate = entradaMiembrosRepository.findAll().size();

        // Update the entradaMiembros
        EntradaMiembros updatedEntradaMiembros = entradaMiembrosRepository.findById(entradaMiembros.getId()).get();
        // Disconnect from session so that the updates on updatedEntradaMiembros are not directly saved in db
        em.detach(updatedEntradaMiembros);
        updatedEntradaMiembros
            .fechaEntrada(UPDATED_FECHA_ENTRADA)
            .fechaSalida(UPDATED_FECHA_SALIDA);

        restEntradaMiembrosMockMvc.perform(put("/api/entrada-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntradaMiembros)))
            .andExpect(status().isOk());

        // Validate the EntradaMiembros in the database
        List<EntradaMiembros> entradaMiembrosList = entradaMiembrosRepository.findAll();
        assertThat(entradaMiembrosList).hasSize(databaseSizeBeforeUpdate);
        EntradaMiembros testEntradaMiembros = entradaMiembrosList.get(entradaMiembrosList.size() - 1);
        assertThat(testEntradaMiembros.getFechaEntrada()).isEqualTo(UPDATED_FECHA_ENTRADA);
        assertThat(testEntradaMiembros.getFechaSalida()).isEqualTo(UPDATED_FECHA_SALIDA);

        // Validate the EntradaMiembros in Elasticsearch
        verify(mockEntradaMiembrosSearchRepository, times(1)).save(testEntradaMiembros);
    }

    @Test
    @Transactional
    public void updateNonExistingEntradaMiembros() throws Exception {
        int databaseSizeBeforeUpdate = entradaMiembrosRepository.findAll().size();

        // Create the EntradaMiembros

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntradaMiembrosMockMvc.perform(put("/api/entrada-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entradaMiembros)))
            .andExpect(status().isBadRequest());

        // Validate the EntradaMiembros in the database
        List<EntradaMiembros> entradaMiembrosList = entradaMiembrosRepository.findAll();
        assertThat(entradaMiembrosList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EntradaMiembros in Elasticsearch
        verify(mockEntradaMiembrosSearchRepository, times(0)).save(entradaMiembros);
    }

    @Test
    @Transactional
    public void deleteEntradaMiembros() throws Exception {
        // Initialize the database
        entradaMiembrosRepository.saveAndFlush(entradaMiembros);

        int databaseSizeBeforeDelete = entradaMiembrosRepository.findAll().size();

        // Delete the entradaMiembros
        restEntradaMiembrosMockMvc.perform(delete("/api/entrada-miembros/{id}", entradaMiembros.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EntradaMiembros> entradaMiembrosList = entradaMiembrosRepository.findAll();
        assertThat(entradaMiembrosList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EntradaMiembros in Elasticsearch
        verify(mockEntradaMiembrosSearchRepository, times(1)).deleteById(entradaMiembros.getId());
    }

    @Test
    @Transactional
    public void searchEntradaMiembros() throws Exception {
        // Initialize the database
        entradaMiembrosRepository.saveAndFlush(entradaMiembros);
        when(mockEntradaMiembrosSearchRepository.search(queryStringQuery("id:" + entradaMiembros.getId())))
            .thenReturn(Collections.singletonList(entradaMiembros));
        // Search the entradaMiembros
        restEntradaMiembrosMockMvc.perform(get("/api/_search/entrada-miembros?query=id:" + entradaMiembros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entradaMiembros.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaEntrada").value(hasItem(DEFAULT_FECHA_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].fechaSalida").value(hasItem(DEFAULT_FECHA_SALIDA.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntradaMiembros.class);
        EntradaMiembros entradaMiembros1 = new EntradaMiembros();
        entradaMiembros1.setId(1L);
        EntradaMiembros entradaMiembros2 = new EntradaMiembros();
        entradaMiembros2.setId(entradaMiembros1.getId());
        assertThat(entradaMiembros1).isEqualTo(entradaMiembros2);
        entradaMiembros2.setId(2L);
        assertThat(entradaMiembros1).isNotEqualTo(entradaMiembros2);
        entradaMiembros1.setId(null);
        assertThat(entradaMiembros1).isNotEqualTo(entradaMiembros2);
    }
}
