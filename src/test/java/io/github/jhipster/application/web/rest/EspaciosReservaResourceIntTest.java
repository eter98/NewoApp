package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.EspaciosReserva;
import io.github.jhipster.application.repository.EspaciosReservaRepository;
import io.github.jhipster.application.repository.search.EspaciosReservaSearchRepository;
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
 * Test class for the EspaciosReservaResource REST controller.
 *
 * @see EspaciosReservaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class EspaciosReservaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_FACILIDADES = "AAAAAAAAAA";
    private static final String UPDATED_FACILIDADES = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACIDAD = 1;
    private static final Integer UPDATED_CAPACIDAD = 2;

    private static final Integer DEFAULT_TARIFA_1_HORA = 1;
    private static final Integer UPDATED_TARIFA_1_HORA = 2;

    private static final Integer DEFAULT_TARIFA_2_HORA = 1;
    private static final Integer UPDATED_TARIFA_2_HORA = 2;

    private static final Integer DEFAULT_TARIFA_3_HORA = 1;
    private static final Integer UPDATED_TARIFA_3_HORA = 2;

    private static final Integer DEFAULT_TARIFA_4_HORA = 1;
    private static final Integer UPDATED_TARIFA_4_HORA = 2;

    private static final Integer DEFAULT_TARIFA_5_HORA = 1;
    private static final Integer UPDATED_TARIFA_5_HORA = 2;

    private static final Integer DEFAULT_TARIFA_6_HORA = 1;
    private static final Integer UPDATED_TARIFA_6_HORA = 2;

    private static final Integer DEFAULT_TARIFA_7_HORA = 1;
    private static final Integer UPDATED_TARIFA_7_HORA = 2;

    private static final Integer DEFAULT_TARIFA_8_HORA = 1;
    private static final Integer UPDATED_TARIFA_8_HORA = 2;

    private static final String DEFAULT_HORARIO = "AAAAAAAAAA";
    private static final String UPDATED_HORARIO = "BBBBBBBBBB";

    private static final String DEFAULT_WIFI = "AAAAAAAAAA";
    private static final String UPDATED_WIFI = "BBBBBBBBBB";

    @Autowired
    private EspaciosReservaRepository espaciosReservaRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EspaciosReservaSearchRepositoryMockConfiguration
     */
    @Autowired
    private EspaciosReservaSearchRepository mockEspaciosReservaSearchRepository;

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

    private MockMvc restEspaciosReservaMockMvc;

    private EspaciosReserva espaciosReserva;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EspaciosReservaResource espaciosReservaResource = new EspaciosReservaResource(espaciosReservaRepository, mockEspaciosReservaSearchRepository);
        this.restEspaciosReservaMockMvc = MockMvcBuilders.standaloneSetup(espaciosReservaResource)
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
    public static EspaciosReserva createEntity(EntityManager em) {
        EspaciosReserva espaciosReserva = new EspaciosReserva()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .facilidades(DEFAULT_FACILIDADES)
            .capacidad(DEFAULT_CAPACIDAD)
            .tarifa1Hora(DEFAULT_TARIFA_1_HORA)
            .tarifa2Hora(DEFAULT_TARIFA_2_HORA)
            .tarifa3Hora(DEFAULT_TARIFA_3_HORA)
            .tarifa4Hora(DEFAULT_TARIFA_4_HORA)
            .tarifa5Hora(DEFAULT_TARIFA_5_HORA)
            .tarifa6Hora(DEFAULT_TARIFA_6_HORA)
            .tarifa7Hora(DEFAULT_TARIFA_7_HORA)
            .tarifa8Hora(DEFAULT_TARIFA_8_HORA)
            .horario(DEFAULT_HORARIO)
            .wifi(DEFAULT_WIFI);
        return espaciosReserva;
    }

    @Before
    public void initTest() {
        espaciosReserva = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspaciosReserva() throws Exception {
        int databaseSizeBeforeCreate = espaciosReservaRepository.findAll().size();

        // Create the EspaciosReserva
        restEspaciosReservaMockMvc.perform(post("/api/espacios-reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaciosReserva)))
            .andExpect(status().isCreated());

        // Validate the EspaciosReserva in the database
        List<EspaciosReserva> espaciosReservaList = espaciosReservaRepository.findAll();
        assertThat(espaciosReservaList).hasSize(databaseSizeBeforeCreate + 1);
        EspaciosReserva testEspaciosReserva = espaciosReservaList.get(espaciosReservaList.size() - 1);
        assertThat(testEspaciosReserva.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEspaciosReserva.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testEspaciosReserva.getFacilidades()).isEqualTo(DEFAULT_FACILIDADES);
        assertThat(testEspaciosReserva.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
        assertThat(testEspaciosReserva.getTarifa1Hora()).isEqualTo(DEFAULT_TARIFA_1_HORA);
        assertThat(testEspaciosReserva.getTarifa2Hora()).isEqualTo(DEFAULT_TARIFA_2_HORA);
        assertThat(testEspaciosReserva.getTarifa3Hora()).isEqualTo(DEFAULT_TARIFA_3_HORA);
        assertThat(testEspaciosReserva.getTarifa4Hora()).isEqualTo(DEFAULT_TARIFA_4_HORA);
        assertThat(testEspaciosReserva.getTarifa5Hora()).isEqualTo(DEFAULT_TARIFA_5_HORA);
        assertThat(testEspaciosReserva.getTarifa6Hora()).isEqualTo(DEFAULT_TARIFA_6_HORA);
        assertThat(testEspaciosReserva.getTarifa7Hora()).isEqualTo(DEFAULT_TARIFA_7_HORA);
        assertThat(testEspaciosReserva.getTarifa8Hora()).isEqualTo(DEFAULT_TARIFA_8_HORA);
        assertThat(testEspaciosReserva.getHorario()).isEqualTo(DEFAULT_HORARIO);
        assertThat(testEspaciosReserva.getWifi()).isEqualTo(DEFAULT_WIFI);

        // Validate the EspaciosReserva in Elasticsearch
        verify(mockEspaciosReservaSearchRepository, times(1)).save(testEspaciosReserva);
    }

    @Test
    @Transactional
    public void createEspaciosReservaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = espaciosReservaRepository.findAll().size();

        // Create the EspaciosReserva with an existing ID
        espaciosReserva.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspaciosReservaMockMvc.perform(post("/api/espacios-reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaciosReserva)))
            .andExpect(status().isBadRequest());

        // Validate the EspaciosReserva in the database
        List<EspaciosReserva> espaciosReservaList = espaciosReservaRepository.findAll();
        assertThat(espaciosReservaList).hasSize(databaseSizeBeforeCreate);

        // Validate the EspaciosReserva in Elasticsearch
        verify(mockEspaciosReservaSearchRepository, times(0)).save(espaciosReserva);
    }

    @Test
    @Transactional
    public void getAllEspaciosReservas() throws Exception {
        // Initialize the database
        espaciosReservaRepository.saveAndFlush(espaciosReserva);

        // Get all the espaciosReservaList
        restEspaciosReservaMockMvc.perform(get("/api/espacios-reservas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espaciosReserva.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].facilidades").value(hasItem(DEFAULT_FACILIDADES.toString())))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].tarifa1Hora").value(hasItem(DEFAULT_TARIFA_1_HORA)))
            .andExpect(jsonPath("$.[*].tarifa2Hora").value(hasItem(DEFAULT_TARIFA_2_HORA)))
            .andExpect(jsonPath("$.[*].tarifa3Hora").value(hasItem(DEFAULT_TARIFA_3_HORA)))
            .andExpect(jsonPath("$.[*].tarifa4Hora").value(hasItem(DEFAULT_TARIFA_4_HORA)))
            .andExpect(jsonPath("$.[*].tarifa5Hora").value(hasItem(DEFAULT_TARIFA_5_HORA)))
            .andExpect(jsonPath("$.[*].tarifa6Hora").value(hasItem(DEFAULT_TARIFA_6_HORA)))
            .andExpect(jsonPath("$.[*].tarifa7Hora").value(hasItem(DEFAULT_TARIFA_7_HORA)))
            .andExpect(jsonPath("$.[*].tarifa8Hora").value(hasItem(DEFAULT_TARIFA_8_HORA)))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO.toString())))
            .andExpect(jsonPath("$.[*].wifi").value(hasItem(DEFAULT_WIFI.toString())));
    }
    
    @Test
    @Transactional
    public void getEspaciosReserva() throws Exception {
        // Initialize the database
        espaciosReservaRepository.saveAndFlush(espaciosReserva);

        // Get the espaciosReserva
        restEspaciosReservaMockMvc.perform(get("/api/espacios-reservas/{id}", espaciosReserva.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(espaciosReserva.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.facilidades").value(DEFAULT_FACILIDADES.toString()))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD))
            .andExpect(jsonPath("$.tarifa1Hora").value(DEFAULT_TARIFA_1_HORA))
            .andExpect(jsonPath("$.tarifa2Hora").value(DEFAULT_TARIFA_2_HORA))
            .andExpect(jsonPath("$.tarifa3Hora").value(DEFAULT_TARIFA_3_HORA))
            .andExpect(jsonPath("$.tarifa4Hora").value(DEFAULT_TARIFA_4_HORA))
            .andExpect(jsonPath("$.tarifa5Hora").value(DEFAULT_TARIFA_5_HORA))
            .andExpect(jsonPath("$.tarifa6Hora").value(DEFAULT_TARIFA_6_HORA))
            .andExpect(jsonPath("$.tarifa7Hora").value(DEFAULT_TARIFA_7_HORA))
            .andExpect(jsonPath("$.tarifa8Hora").value(DEFAULT_TARIFA_8_HORA))
            .andExpect(jsonPath("$.horario").value(DEFAULT_HORARIO.toString()))
            .andExpect(jsonPath("$.wifi").value(DEFAULT_WIFI.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEspaciosReserva() throws Exception {
        // Get the espaciosReserva
        restEspaciosReservaMockMvc.perform(get("/api/espacios-reservas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspaciosReserva() throws Exception {
        // Initialize the database
        espaciosReservaRepository.saveAndFlush(espaciosReserva);

        int databaseSizeBeforeUpdate = espaciosReservaRepository.findAll().size();

        // Update the espaciosReserva
        EspaciosReserva updatedEspaciosReserva = espaciosReservaRepository.findById(espaciosReserva.getId()).get();
        // Disconnect from session so that the updates on updatedEspaciosReserva are not directly saved in db
        em.detach(updatedEspaciosReserva);
        updatedEspaciosReserva
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .facilidades(UPDATED_FACILIDADES)
            .capacidad(UPDATED_CAPACIDAD)
            .tarifa1Hora(UPDATED_TARIFA_1_HORA)
            .tarifa2Hora(UPDATED_TARIFA_2_HORA)
            .tarifa3Hora(UPDATED_TARIFA_3_HORA)
            .tarifa4Hora(UPDATED_TARIFA_4_HORA)
            .tarifa5Hora(UPDATED_TARIFA_5_HORA)
            .tarifa6Hora(UPDATED_TARIFA_6_HORA)
            .tarifa7Hora(UPDATED_TARIFA_7_HORA)
            .tarifa8Hora(UPDATED_TARIFA_8_HORA)
            .horario(UPDATED_HORARIO)
            .wifi(UPDATED_WIFI);

        restEspaciosReservaMockMvc.perform(put("/api/espacios-reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspaciosReserva)))
            .andExpect(status().isOk());

        // Validate the EspaciosReserva in the database
        List<EspaciosReserva> espaciosReservaList = espaciosReservaRepository.findAll();
        assertThat(espaciosReservaList).hasSize(databaseSizeBeforeUpdate);
        EspaciosReserva testEspaciosReserva = espaciosReservaList.get(espaciosReservaList.size() - 1);
        assertThat(testEspaciosReserva.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEspaciosReserva.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testEspaciosReserva.getFacilidades()).isEqualTo(UPDATED_FACILIDADES);
        assertThat(testEspaciosReserva.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testEspaciosReserva.getTarifa1Hora()).isEqualTo(UPDATED_TARIFA_1_HORA);
        assertThat(testEspaciosReserva.getTarifa2Hora()).isEqualTo(UPDATED_TARIFA_2_HORA);
        assertThat(testEspaciosReserva.getTarifa3Hora()).isEqualTo(UPDATED_TARIFA_3_HORA);
        assertThat(testEspaciosReserva.getTarifa4Hora()).isEqualTo(UPDATED_TARIFA_4_HORA);
        assertThat(testEspaciosReserva.getTarifa5Hora()).isEqualTo(UPDATED_TARIFA_5_HORA);
        assertThat(testEspaciosReserva.getTarifa6Hora()).isEqualTo(UPDATED_TARIFA_6_HORA);
        assertThat(testEspaciosReserva.getTarifa7Hora()).isEqualTo(UPDATED_TARIFA_7_HORA);
        assertThat(testEspaciosReserva.getTarifa8Hora()).isEqualTo(UPDATED_TARIFA_8_HORA);
        assertThat(testEspaciosReserva.getHorario()).isEqualTo(UPDATED_HORARIO);
        assertThat(testEspaciosReserva.getWifi()).isEqualTo(UPDATED_WIFI);

        // Validate the EspaciosReserva in Elasticsearch
        verify(mockEspaciosReservaSearchRepository, times(1)).save(testEspaciosReserva);
    }

    @Test
    @Transactional
    public void updateNonExistingEspaciosReserva() throws Exception {
        int databaseSizeBeforeUpdate = espaciosReservaRepository.findAll().size();

        // Create the EspaciosReserva

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspaciosReservaMockMvc.perform(put("/api/espacios-reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espaciosReserva)))
            .andExpect(status().isBadRequest());

        // Validate the EspaciosReserva in the database
        List<EspaciosReserva> espaciosReservaList = espaciosReservaRepository.findAll();
        assertThat(espaciosReservaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EspaciosReserva in Elasticsearch
        verify(mockEspaciosReservaSearchRepository, times(0)).save(espaciosReserva);
    }

    @Test
    @Transactional
    public void deleteEspaciosReserva() throws Exception {
        // Initialize the database
        espaciosReservaRepository.saveAndFlush(espaciosReserva);

        int databaseSizeBeforeDelete = espaciosReservaRepository.findAll().size();

        // Delete the espaciosReserva
        restEspaciosReservaMockMvc.perform(delete("/api/espacios-reservas/{id}", espaciosReserva.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EspaciosReserva> espaciosReservaList = espaciosReservaRepository.findAll();
        assertThat(espaciosReservaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EspaciosReserva in Elasticsearch
        verify(mockEspaciosReservaSearchRepository, times(1)).deleteById(espaciosReserva.getId());
    }

    @Test
    @Transactional
    public void searchEspaciosReserva() throws Exception {
        // Initialize the database
        espaciosReservaRepository.saveAndFlush(espaciosReserva);
        when(mockEspaciosReservaSearchRepository.search(queryStringQuery("id:" + espaciosReserva.getId())))
            .thenReturn(Collections.singletonList(espaciosReserva));
        // Search the espaciosReserva
        restEspaciosReservaMockMvc.perform(get("/api/_search/espacios-reservas?query=id:" + espaciosReserva.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espaciosReserva.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].facilidades").value(hasItem(DEFAULT_FACILIDADES)))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].tarifa1Hora").value(hasItem(DEFAULT_TARIFA_1_HORA)))
            .andExpect(jsonPath("$.[*].tarifa2Hora").value(hasItem(DEFAULT_TARIFA_2_HORA)))
            .andExpect(jsonPath("$.[*].tarifa3Hora").value(hasItem(DEFAULT_TARIFA_3_HORA)))
            .andExpect(jsonPath("$.[*].tarifa4Hora").value(hasItem(DEFAULT_TARIFA_4_HORA)))
            .andExpect(jsonPath("$.[*].tarifa5Hora").value(hasItem(DEFAULT_TARIFA_5_HORA)))
            .andExpect(jsonPath("$.[*].tarifa6Hora").value(hasItem(DEFAULT_TARIFA_6_HORA)))
            .andExpect(jsonPath("$.[*].tarifa7Hora").value(hasItem(DEFAULT_TARIFA_7_HORA)))
            .andExpect(jsonPath("$.[*].tarifa8Hora").value(hasItem(DEFAULT_TARIFA_8_HORA)))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO)))
            .andExpect(jsonPath("$.[*].wifi").value(hasItem(DEFAULT_WIFI)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspaciosReserva.class);
        EspaciosReserva espaciosReserva1 = new EspaciosReserva();
        espaciosReserva1.setId(1L);
        EspaciosReserva espaciosReserva2 = new EspaciosReserva();
        espaciosReserva2.setId(espaciosReserva1.getId());
        assertThat(espaciosReserva1).isEqualTo(espaciosReserva2);
        espaciosReserva2.setId(2L);
        assertThat(espaciosReserva1).isNotEqualTo(espaciosReserva2);
        espaciosReserva1.setId(null);
        assertThat(espaciosReserva1).isNotEqualTo(espaciosReserva2);
    }
}
