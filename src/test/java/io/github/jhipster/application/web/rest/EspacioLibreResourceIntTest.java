package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.EspacioLibre;
import io.github.jhipster.application.repository.EspacioLibreRepository;
import io.github.jhipster.application.repository.search.EspacioLibreSearchRepository;
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
 * Test class for the EspacioLibreResource REST controller.
 *
 * @see EspacioLibreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class EspacioLibreResourceIntTest {

    private static final Integer DEFAULT_CAPACIDAD_INSTALADA = 1;
    private static final Integer UPDATED_CAPACIDAD_INSTALADA = 2;

    private static final Integer DEFAULT_TIPO_DE_ESPACIOS = 1;
    private static final Integer UPDATED_TIPO_DE_ESPACIOS = 2;

    private static final String DEFAULT_WIFI = "AAAAAAAAAA";
    private static final String UPDATED_WIFI = "BBBBBBBBBB";

    private static final Integer DEFAULT_TARIFA_1_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_1_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_2_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_2_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_3_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_3_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_4_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_4_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_5_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_5_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_6_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_6_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_7_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_7_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_8_H_MIEMBRO = 1;
    private static final Integer UPDATED_TARIFA_8_H_MIEMBRO = 2;

    private static final Integer DEFAULT_TARIFA_1_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_1_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_2_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_2_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_3_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_3_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_4_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_4_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_5_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_5_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_6_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_6_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_7_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_7_H_INVITADO = 2;

    private static final Integer DEFAULT_TARIFA_8_H_INVITADO = 1;
    private static final Integer UPDATED_TARIFA_8_H_INVITADO = 2;

    @Autowired
    private EspacioLibreRepository espacioLibreRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EspacioLibreSearchRepositoryMockConfiguration
     */
    @Autowired
    private EspacioLibreSearchRepository mockEspacioLibreSearchRepository;

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

    private MockMvc restEspacioLibreMockMvc;

    private EspacioLibre espacioLibre;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EspacioLibreResource espacioLibreResource = new EspacioLibreResource(espacioLibreRepository, mockEspacioLibreSearchRepository);
        this.restEspacioLibreMockMvc = MockMvcBuilders.standaloneSetup(espacioLibreResource)
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
    public static EspacioLibre createEntity(EntityManager em) {
        EspacioLibre espacioLibre = new EspacioLibre()
            .capacidadInstalada(DEFAULT_CAPACIDAD_INSTALADA)
            .tipoDeEspacios(DEFAULT_TIPO_DE_ESPACIOS)
            .wifi(DEFAULT_WIFI)
            .tarifa1hMiembro(DEFAULT_TARIFA_1_H_MIEMBRO)
            .tarifa2hMiembro(DEFAULT_TARIFA_2_H_MIEMBRO)
            .tarifa3hMiembro(DEFAULT_TARIFA_3_H_MIEMBRO)
            .tarifa4hMiembro(DEFAULT_TARIFA_4_H_MIEMBRO)
            .tarifa5hMiembro(DEFAULT_TARIFA_5_H_MIEMBRO)
            .tarifa6hMiembro(DEFAULT_TARIFA_6_H_MIEMBRO)
            .tarifa7hMiembro(DEFAULT_TARIFA_7_H_MIEMBRO)
            .tarifa8hMiembro(DEFAULT_TARIFA_8_H_MIEMBRO)
            .tarifa1hInvitado(DEFAULT_TARIFA_1_H_INVITADO)
            .tarifa2hInvitado(DEFAULT_TARIFA_2_H_INVITADO)
            .tarifa3hInvitado(DEFAULT_TARIFA_3_H_INVITADO)
            .tarifa4hInvitado(DEFAULT_TARIFA_4_H_INVITADO)
            .tarifa5hInvitado(DEFAULT_TARIFA_5_H_INVITADO)
            .tarifa6hInvitado(DEFAULT_TARIFA_6_H_INVITADO)
            .tarifa7hInvitado(DEFAULT_TARIFA_7_H_INVITADO)
            .tarifa8hInvitado(DEFAULT_TARIFA_8_H_INVITADO);
        return espacioLibre;
    }

    @Before
    public void initTest() {
        espacioLibre = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspacioLibre() throws Exception {
        int databaseSizeBeforeCreate = espacioLibreRepository.findAll().size();

        // Create the EspacioLibre
        restEspacioLibreMockMvc.perform(post("/api/espacio-libres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioLibre)))
            .andExpect(status().isCreated());

        // Validate the EspacioLibre in the database
        List<EspacioLibre> espacioLibreList = espacioLibreRepository.findAll();
        assertThat(espacioLibreList).hasSize(databaseSizeBeforeCreate + 1);
        EspacioLibre testEspacioLibre = espacioLibreList.get(espacioLibreList.size() - 1);
        assertThat(testEspacioLibre.getCapacidadInstalada()).isEqualTo(DEFAULT_CAPACIDAD_INSTALADA);
        assertThat(testEspacioLibre.getTipoDeEspacios()).isEqualTo(DEFAULT_TIPO_DE_ESPACIOS);
        assertThat(testEspacioLibre.getWifi()).isEqualTo(DEFAULT_WIFI);
        assertThat(testEspacioLibre.getTarifa1hMiembro()).isEqualTo(DEFAULT_TARIFA_1_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa2hMiembro()).isEqualTo(DEFAULT_TARIFA_2_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa3hMiembro()).isEqualTo(DEFAULT_TARIFA_3_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa4hMiembro()).isEqualTo(DEFAULT_TARIFA_4_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa5hMiembro()).isEqualTo(DEFAULT_TARIFA_5_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa6hMiembro()).isEqualTo(DEFAULT_TARIFA_6_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa7hMiembro()).isEqualTo(DEFAULT_TARIFA_7_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa8hMiembro()).isEqualTo(DEFAULT_TARIFA_8_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa1hInvitado()).isEqualTo(DEFAULT_TARIFA_1_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa2hInvitado()).isEqualTo(DEFAULT_TARIFA_2_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa3hInvitado()).isEqualTo(DEFAULT_TARIFA_3_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa4hInvitado()).isEqualTo(DEFAULT_TARIFA_4_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa5hInvitado()).isEqualTo(DEFAULT_TARIFA_5_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa6hInvitado()).isEqualTo(DEFAULT_TARIFA_6_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa7hInvitado()).isEqualTo(DEFAULT_TARIFA_7_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa8hInvitado()).isEqualTo(DEFAULT_TARIFA_8_H_INVITADO);

        // Validate the EspacioLibre in Elasticsearch
        verify(mockEspacioLibreSearchRepository, times(1)).save(testEspacioLibre);
    }

    @Test
    @Transactional
    public void createEspacioLibreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = espacioLibreRepository.findAll().size();

        // Create the EspacioLibre with an existing ID
        espacioLibre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspacioLibreMockMvc.perform(post("/api/espacio-libres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioLibre)))
            .andExpect(status().isBadRequest());

        // Validate the EspacioLibre in the database
        List<EspacioLibre> espacioLibreList = espacioLibreRepository.findAll();
        assertThat(espacioLibreList).hasSize(databaseSizeBeforeCreate);

        // Validate the EspacioLibre in Elasticsearch
        verify(mockEspacioLibreSearchRepository, times(0)).save(espacioLibre);
    }

    @Test
    @Transactional
    public void getAllEspacioLibres() throws Exception {
        // Initialize the database
        espacioLibreRepository.saveAndFlush(espacioLibre);

        // Get all the espacioLibreList
        restEspacioLibreMockMvc.perform(get("/api/espacio-libres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espacioLibre.getId().intValue())))
            .andExpect(jsonPath("$.[*].capacidadInstalada").value(hasItem(DEFAULT_CAPACIDAD_INSTALADA)))
            .andExpect(jsonPath("$.[*].tipoDeEspacios").value(hasItem(DEFAULT_TIPO_DE_ESPACIOS)))
            .andExpect(jsonPath("$.[*].wifi").value(hasItem(DEFAULT_WIFI.toString())))
            .andExpect(jsonPath("$.[*].tarifa1hMiembro").value(hasItem(DEFAULT_TARIFA_1_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa2hMiembro").value(hasItem(DEFAULT_TARIFA_2_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa3hMiembro").value(hasItem(DEFAULT_TARIFA_3_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa4hMiembro").value(hasItem(DEFAULT_TARIFA_4_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa5hMiembro").value(hasItem(DEFAULT_TARIFA_5_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa6hMiembro").value(hasItem(DEFAULT_TARIFA_6_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa7hMiembro").value(hasItem(DEFAULT_TARIFA_7_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa8hMiembro").value(hasItem(DEFAULT_TARIFA_8_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa1hInvitado").value(hasItem(DEFAULT_TARIFA_1_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa2hInvitado").value(hasItem(DEFAULT_TARIFA_2_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa3hInvitado").value(hasItem(DEFAULT_TARIFA_3_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa4hInvitado").value(hasItem(DEFAULT_TARIFA_4_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa5hInvitado").value(hasItem(DEFAULT_TARIFA_5_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa6hInvitado").value(hasItem(DEFAULT_TARIFA_6_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa7hInvitado").value(hasItem(DEFAULT_TARIFA_7_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa8hInvitado").value(hasItem(DEFAULT_TARIFA_8_H_INVITADO)));
    }
    
    @Test
    @Transactional
    public void getEspacioLibre() throws Exception {
        // Initialize the database
        espacioLibreRepository.saveAndFlush(espacioLibre);

        // Get the espacioLibre
        restEspacioLibreMockMvc.perform(get("/api/espacio-libres/{id}", espacioLibre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(espacioLibre.getId().intValue()))
            .andExpect(jsonPath("$.capacidadInstalada").value(DEFAULT_CAPACIDAD_INSTALADA))
            .andExpect(jsonPath("$.tipoDeEspacios").value(DEFAULT_TIPO_DE_ESPACIOS))
            .andExpect(jsonPath("$.wifi").value(DEFAULT_WIFI.toString()))
            .andExpect(jsonPath("$.tarifa1hMiembro").value(DEFAULT_TARIFA_1_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa2hMiembro").value(DEFAULT_TARIFA_2_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa3hMiembro").value(DEFAULT_TARIFA_3_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa4hMiembro").value(DEFAULT_TARIFA_4_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa5hMiembro").value(DEFAULT_TARIFA_5_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa6hMiembro").value(DEFAULT_TARIFA_6_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa7hMiembro").value(DEFAULT_TARIFA_7_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa8hMiembro").value(DEFAULT_TARIFA_8_H_MIEMBRO))
            .andExpect(jsonPath("$.tarifa1hInvitado").value(DEFAULT_TARIFA_1_H_INVITADO))
            .andExpect(jsonPath("$.tarifa2hInvitado").value(DEFAULT_TARIFA_2_H_INVITADO))
            .andExpect(jsonPath("$.tarifa3hInvitado").value(DEFAULT_TARIFA_3_H_INVITADO))
            .andExpect(jsonPath("$.tarifa4hInvitado").value(DEFAULT_TARIFA_4_H_INVITADO))
            .andExpect(jsonPath("$.tarifa5hInvitado").value(DEFAULT_TARIFA_5_H_INVITADO))
            .andExpect(jsonPath("$.tarifa6hInvitado").value(DEFAULT_TARIFA_6_H_INVITADO))
            .andExpect(jsonPath("$.tarifa7hInvitado").value(DEFAULT_TARIFA_7_H_INVITADO))
            .andExpect(jsonPath("$.tarifa8hInvitado").value(DEFAULT_TARIFA_8_H_INVITADO));
    }

    @Test
    @Transactional
    public void getNonExistingEspacioLibre() throws Exception {
        // Get the espacioLibre
        restEspacioLibreMockMvc.perform(get("/api/espacio-libres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspacioLibre() throws Exception {
        // Initialize the database
        espacioLibreRepository.saveAndFlush(espacioLibre);

        int databaseSizeBeforeUpdate = espacioLibreRepository.findAll().size();

        // Update the espacioLibre
        EspacioLibre updatedEspacioLibre = espacioLibreRepository.findById(espacioLibre.getId()).get();
        // Disconnect from session so that the updates on updatedEspacioLibre are not directly saved in db
        em.detach(updatedEspacioLibre);
        updatedEspacioLibre
            .capacidadInstalada(UPDATED_CAPACIDAD_INSTALADA)
            .tipoDeEspacios(UPDATED_TIPO_DE_ESPACIOS)
            .wifi(UPDATED_WIFI)
            .tarifa1hMiembro(UPDATED_TARIFA_1_H_MIEMBRO)
            .tarifa2hMiembro(UPDATED_TARIFA_2_H_MIEMBRO)
            .tarifa3hMiembro(UPDATED_TARIFA_3_H_MIEMBRO)
            .tarifa4hMiembro(UPDATED_TARIFA_4_H_MIEMBRO)
            .tarifa5hMiembro(UPDATED_TARIFA_5_H_MIEMBRO)
            .tarifa6hMiembro(UPDATED_TARIFA_6_H_MIEMBRO)
            .tarifa7hMiembro(UPDATED_TARIFA_7_H_MIEMBRO)
            .tarifa8hMiembro(UPDATED_TARIFA_8_H_MIEMBRO)
            .tarifa1hInvitado(UPDATED_TARIFA_1_H_INVITADO)
            .tarifa2hInvitado(UPDATED_TARIFA_2_H_INVITADO)
            .tarifa3hInvitado(UPDATED_TARIFA_3_H_INVITADO)
            .tarifa4hInvitado(UPDATED_TARIFA_4_H_INVITADO)
            .tarifa5hInvitado(UPDATED_TARIFA_5_H_INVITADO)
            .tarifa6hInvitado(UPDATED_TARIFA_6_H_INVITADO)
            .tarifa7hInvitado(UPDATED_TARIFA_7_H_INVITADO)
            .tarifa8hInvitado(UPDATED_TARIFA_8_H_INVITADO);

        restEspacioLibreMockMvc.perform(put("/api/espacio-libres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspacioLibre)))
            .andExpect(status().isOk());

        // Validate the EspacioLibre in the database
        List<EspacioLibre> espacioLibreList = espacioLibreRepository.findAll();
        assertThat(espacioLibreList).hasSize(databaseSizeBeforeUpdate);
        EspacioLibre testEspacioLibre = espacioLibreList.get(espacioLibreList.size() - 1);
        assertThat(testEspacioLibre.getCapacidadInstalada()).isEqualTo(UPDATED_CAPACIDAD_INSTALADA);
        assertThat(testEspacioLibre.getTipoDeEspacios()).isEqualTo(UPDATED_TIPO_DE_ESPACIOS);
        assertThat(testEspacioLibre.getWifi()).isEqualTo(UPDATED_WIFI);
        assertThat(testEspacioLibre.getTarifa1hMiembro()).isEqualTo(UPDATED_TARIFA_1_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa2hMiembro()).isEqualTo(UPDATED_TARIFA_2_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa3hMiembro()).isEqualTo(UPDATED_TARIFA_3_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa4hMiembro()).isEqualTo(UPDATED_TARIFA_4_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa5hMiembro()).isEqualTo(UPDATED_TARIFA_5_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa6hMiembro()).isEqualTo(UPDATED_TARIFA_6_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa7hMiembro()).isEqualTo(UPDATED_TARIFA_7_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa8hMiembro()).isEqualTo(UPDATED_TARIFA_8_H_MIEMBRO);
        assertThat(testEspacioLibre.getTarifa1hInvitado()).isEqualTo(UPDATED_TARIFA_1_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa2hInvitado()).isEqualTo(UPDATED_TARIFA_2_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa3hInvitado()).isEqualTo(UPDATED_TARIFA_3_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa4hInvitado()).isEqualTo(UPDATED_TARIFA_4_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa5hInvitado()).isEqualTo(UPDATED_TARIFA_5_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa6hInvitado()).isEqualTo(UPDATED_TARIFA_6_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa7hInvitado()).isEqualTo(UPDATED_TARIFA_7_H_INVITADO);
        assertThat(testEspacioLibre.getTarifa8hInvitado()).isEqualTo(UPDATED_TARIFA_8_H_INVITADO);

        // Validate the EspacioLibre in Elasticsearch
        verify(mockEspacioLibreSearchRepository, times(1)).save(testEspacioLibre);
    }

    @Test
    @Transactional
    public void updateNonExistingEspacioLibre() throws Exception {
        int databaseSizeBeforeUpdate = espacioLibreRepository.findAll().size();

        // Create the EspacioLibre

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspacioLibreMockMvc.perform(put("/api/espacio-libres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioLibre)))
            .andExpect(status().isBadRequest());

        // Validate the EspacioLibre in the database
        List<EspacioLibre> espacioLibreList = espacioLibreRepository.findAll();
        assertThat(espacioLibreList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EspacioLibre in Elasticsearch
        verify(mockEspacioLibreSearchRepository, times(0)).save(espacioLibre);
    }

    @Test
    @Transactional
    public void deleteEspacioLibre() throws Exception {
        // Initialize the database
        espacioLibreRepository.saveAndFlush(espacioLibre);

        int databaseSizeBeforeDelete = espacioLibreRepository.findAll().size();

        // Delete the espacioLibre
        restEspacioLibreMockMvc.perform(delete("/api/espacio-libres/{id}", espacioLibre.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EspacioLibre> espacioLibreList = espacioLibreRepository.findAll();
        assertThat(espacioLibreList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EspacioLibre in Elasticsearch
        verify(mockEspacioLibreSearchRepository, times(1)).deleteById(espacioLibre.getId());
    }

    @Test
    @Transactional
    public void searchEspacioLibre() throws Exception {
        // Initialize the database
        espacioLibreRepository.saveAndFlush(espacioLibre);
        when(mockEspacioLibreSearchRepository.search(queryStringQuery("id:" + espacioLibre.getId())))
            .thenReturn(Collections.singletonList(espacioLibre));
        // Search the espacioLibre
        restEspacioLibreMockMvc.perform(get("/api/_search/espacio-libres?query=id:" + espacioLibre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espacioLibre.getId().intValue())))
            .andExpect(jsonPath("$.[*].capacidadInstalada").value(hasItem(DEFAULT_CAPACIDAD_INSTALADA)))
            .andExpect(jsonPath("$.[*].tipoDeEspacios").value(hasItem(DEFAULT_TIPO_DE_ESPACIOS)))
            .andExpect(jsonPath("$.[*].wifi").value(hasItem(DEFAULT_WIFI)))
            .andExpect(jsonPath("$.[*].tarifa1hMiembro").value(hasItem(DEFAULT_TARIFA_1_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa2hMiembro").value(hasItem(DEFAULT_TARIFA_2_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa3hMiembro").value(hasItem(DEFAULT_TARIFA_3_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa4hMiembro").value(hasItem(DEFAULT_TARIFA_4_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa5hMiembro").value(hasItem(DEFAULT_TARIFA_5_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa6hMiembro").value(hasItem(DEFAULT_TARIFA_6_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa7hMiembro").value(hasItem(DEFAULT_TARIFA_7_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa8hMiembro").value(hasItem(DEFAULT_TARIFA_8_H_MIEMBRO)))
            .andExpect(jsonPath("$.[*].tarifa1hInvitado").value(hasItem(DEFAULT_TARIFA_1_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa2hInvitado").value(hasItem(DEFAULT_TARIFA_2_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa3hInvitado").value(hasItem(DEFAULT_TARIFA_3_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa4hInvitado").value(hasItem(DEFAULT_TARIFA_4_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa5hInvitado").value(hasItem(DEFAULT_TARIFA_5_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa6hInvitado").value(hasItem(DEFAULT_TARIFA_6_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa7hInvitado").value(hasItem(DEFAULT_TARIFA_7_H_INVITADO)))
            .andExpect(jsonPath("$.[*].tarifa8hInvitado").value(hasItem(DEFAULT_TARIFA_8_H_INVITADO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspacioLibre.class);
        EspacioLibre espacioLibre1 = new EspacioLibre();
        espacioLibre1.setId(1L);
        EspacioLibre espacioLibre2 = new EspacioLibre();
        espacioLibre2.setId(espacioLibre1.getId());
        assertThat(espacioLibre1).isEqualTo(espacioLibre2);
        espacioLibre2.setId(2L);
        assertThat(espacioLibre1).isNotEqualTo(espacioLibre2);
        espacioLibre1.setId(null);
        assertThat(espacioLibre1).isNotEqualTo(espacioLibre2);
    }
}
